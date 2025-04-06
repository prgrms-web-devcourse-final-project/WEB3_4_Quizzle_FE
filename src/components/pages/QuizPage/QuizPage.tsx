import type React from "react"
import {useState, useEffect} from "react"
import AppTemplate from "../../templates/AppTemplate/AppTemplate.tsx";
import QuizQuestion from "../../organisms/QuizQuestion/QuizQuestion.tsx";
import PlayerList from "../../organisms/PlayerList/PlayerList.tsx";
import QuizHeader from "../../organisms/Headers/GameRoomHeader/QuizHeader.tsx";
import "./QuizPage.scss"

const QuizPage: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [timeLeft, setTimeLeft] = useState(30)
    const [score, setScore] = useState(200)

    // Mock data
    const questions = [
        {
            id: "1",
            question: "호주의 수도는?",
            options: [
                {id: "a", value: "A", label: "시드니"},
                {id: "b", value: "B", label: "멜버른"},
                {id: "c", value: "C", label: "캔버라"},
                {id: "d", value: "D", label: "퍼스"},
            ],
            correctAnswer: "c",
        },
        {
            id: "2",
            question: "미국의 수도는?",
            options: [
                {id: "a", value: "A", label: "시드니"},
                {id: "b", value: "B", label: "멜버른"},
                {id: "c", value: "C", label: "캔버라"},
                {id: "d", value: "D", label: "퍼스"},
            ],
            correctAnswer: "c",
        }
    ]

    const players = [
        {
            id: "1",
            name: "Player 2",
            avatar: "/assets/avatars/avatar2.png",
            score: 300,
        },
        {
            id: "2",
            name: "You",
            avatar: "/assets/avatars/avatar1.png",
            score: 200,
        },
        {
            id: "3",
            name: "Player 1",
            avatar: "/assets/avatars/avatar3.png",
            score: 150,
        },
        {
            id: "4",
            name: "Player 4",
            avatar: "/assets/avatars/avatar4.png",
            score: 100,
        },
        {
            id: "5",
            name: "Player 6",
            avatar: "/assets/avatars/avatar6.png",
            score: 300,
        },
        {
            id: "6",
            name: "Player 8",
            avatar: "/assets/avatars/avatar8.png",
            score: 200,
        },
        {
            id: "7",
            name: "Player 5",
            avatar: "/assets/avatars/avatar5.png",
            score: 150,
        },
        {
            id: "8",
            name: "Player 7",
            avatar: "/assets/avatars/avatar7.png",
            score: 100,
        },
    ]

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score)


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

    const handleAnswer = (optionId: string) => {
        // Check if answer is correct
        const isCorrect = optionId === questions[currentQuestion].correctAnswer

        if (isCorrect) {
            // Calculate score based on time left
            const questionScore = Math.floor(100 * (timeLeft / 30))
            setScore((prev) => prev + questionScore)
        }

        // Move to next question or end quiz
        if (currentQuestion < questions.length) {
            setCurrentQuestion((prev) => prev + 1)
            setTimeLeft(30)
        } else {
            // End quiz
            console.log("Quiz ended")
        }
    }

    return (
        <AppTemplate header={
            <QuizHeader currentQuestion={currentQuestion} questions={questions} score={score}/>
        } content={
            <div className="quiz-page__content">
                <QuizQuestion question={questions[currentQuestion].question}
                              options={questions[currentQuestion].options} timeLeft={timeLeft}
                              onAnswer={handleAnswer}/>
                <div className="quiz-page__player-list">
                    <PlayerList players={sortedPlayers}/>
                </div>
            </div>
        }/>
    )
}

export default QuizPage

