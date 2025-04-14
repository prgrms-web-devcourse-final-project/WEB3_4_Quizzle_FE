import type React from "react"
import {useState} from "react"
import Card from "../../atoms/Card/Card"
import QuizOption from "../../molecules/QuizOption/QuizOption"
import './QuizQuestion.scss';

export interface QuizQuestionOption {
    id: string
    label: string
    value: string
}

export interface QuizQuestionProps {
    question: string
    options: string[]
    timeLeft?: number
    onAnswer?: (optionId: string) => void
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({question, options, timeLeft, onAnswer}) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null)

    const optionIds = options.map((option) => option[0])

    const handleOptionClick = (optionId: string) => {
        setSelectedOption(optionId)

        if (onAnswer) {
            onAnswer(optionId)
        }
    }

    const timerStyle = {
        position: "relative" as const,
        height: "8px",
        backgroundColor: "#dee2e6",
        borderRadius: "0.5rem",
        marginBottom: "1rem",
        overflow: "hidden",
    }

    const timerProgressStyle = {
        position: "absolute" as const,
        top: 0,
        left: 0,
        height: "100%",
        backgroundColor: "#5e3bee",
        width: `${((timeLeft || 0) / 30) * 100}%`,
        transition: "width 1s linear",
    }

    const timerTextStyle = {
        position: "absolute" as const,
        top: "-20px",
        right: 0,
        fontSize: "0.875rem",
        fontWeight: "bold",
    }

    const titleStyle = {
        textAlign: "center" as const,
        marginBottom: "2rem",
    }

    const optionsStyle = {
        padding: "1rem 0",
    }

    return (
        <Card className="quiz-question">
            {timeLeft !== undefined && (
                <div style={timerStyle}>
                    <div style={timerProgressStyle}></div>
                    <div style={timerTextStyle}>{timeLeft}s</div>
                </div>
            )}
            <h2 style={titleStyle}>{question}</h2>
            <div style={optionsStyle}>
                {options.map((option, index) => (
                    <QuizOption
                        key={`option-${optionIds[index]}`}
                        label={option}
                        value={optionIds[index]}
                        selected={selectedOption === optionIds[index]}
                        onClick={() => handleOptionClick(optionIds[index])}
                    />
                ))}
            </div>
        </Card>
    )
}

export default QuizQuestion

