import type React from "react"
import {useState, useEffect} from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import QuizQuestion from "../../organisms/QuizQuestion/QuizQuestion.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import QuizHeader from "../../organisms/Headers/GameRoomHeader/QuizHeader.tsx";
import "./QuizPage.scss"

const QuizPage: React.FC<{roomId: string}> = ({roomId}) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [score, setScore] = useState(200)

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

    useEffect(() => {})

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

    return (
        <AppTemplate header={
            <QuizHeader currentQuestion={currentQuestion} questions={questions} score={score}/>
        } content={
            <div className="quiz-page__content">
                <QuizQuestion question={questions[currentQuestion].question}
                              options={questions[currentQuestion].options} timeLeft={timeLeft}
                              onAnswer={handleAnswer}/>
                <div className="quiz-page__player-list">
                    <PlayerList playerIds={[]}/>
                </div>
            </div>
        }/>
    )
}

export default QuizPage

