import type React from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import QuizQuestion from "../../organisms/QuizQuestion/QuizQuestion.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import QuizHeader from "../../organisms/Headers/GameRoomHeader/QuizHeader.tsx";
import "./QuizPage.scss"
import useWebSocket from "../../../hooks/webSocket.ts";
import useUser from "../../../hooks/user.ts";
import { getRoom } from "../../../services/remote/room.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Quiz } from "../../../types/quiz.ts";

const QuizPage: React.FC<{roomId: string, quiz: Quiz}> = ({roomId, quiz}) => {

    const {user: me, isLoading: isMeLoading} = useUser();
    const [currentQuestion, setCurrentQuestion] = useState(Object.keys(quiz.quizText)[0]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer)

                    // do something here

                    return 0
                }
                return prev - 1
            })
        }, 1000);

        return () => clearInterval(timer)
    }, [currentQuestion])

    const {data: room, isLoading: isRoomLoading} = useQuery({
        queryKey: ["room", roomId],
        queryFn: () => getRoom(roomId)
    })

    const { isConnected, submitQuizAnswer} = useWebSocket({
        roomId,
        quizId: quiz.quizId,
        onQuizUpdate: (quiz) => {
            console.log(quiz)
        },
    });

    const handleAnswer = (optionId: string) => {
        submitQuizAnswer(quiz.quizId, {
            questionNumber: Number(currentQuestion),
            submittedAnswer: optionId
        })
    }

    if (!isConnected || isMeLoading || isRoomLoading) {
        return <div>Loading...</div>
    }

    const quizQuestionParts = quiz.quizText[currentQuestion].split('\n');
    const question = quizQuestionParts[0];
    const questionOptions = quizQuestionParts.slice(1);

    return (
        <AppTemplate header={
            <QuizHeader currentQuestion={currentQuestion} quiz={quiz} timeLeft={timeLeft}/>
        } content={
            <div className="quiz-page__content">
                <QuizQuestion question={question}
                              options={questionOptions}
                              onAnswer={handleAnswer}/>
                <div className="quiz-page__player-list">
                    <PlayerList playerIds={[]}/>
                </div>
            </div>
        }/>
    )
}

export default QuizPage


    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setTimeLeft((prev) => {
    //             if (prev <= 1) {
    //                 clearInterval(timer)

    //                 // do something here

    //                 return 0
    //             }
    //             return prev - 1
    //         })
    //     }, 1000);

    //     return () => clearInterval(timer)
    // }, [currentQuestion])

    // const handleAnswer = (optionId: string) => {
    //     // Check if answer is correct
    //     const isCorrect = optionId === questions[currentQuestion].correctAnswer

    //     if (isCorrect) {
    //         // Calculate score based on time left
    //         const questionScore = Math.floor(100 * (timeLeft / 30))
    //         setScore((prev) => prev + questionScore)
    //     }

    //     // Move to next question or end quiz
    //     if (currentQuestion < questions.length) {
    //         setCurrentQuestion((prev) => prev + 1)
    //         setTimeLeft(30)
    //     } else {
    //         // End quiz
    //         console.log("Quiz ended")
    //     }
    // }
