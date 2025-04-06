import "./QuizHeader.scss";


interface QuizHeaderProps {
    currentQuestion: number;
    questions: any[];
    score: number;
}

const QuizHeader = ({currentQuestion, questions, score}: QuizHeaderProps) => {

    return (
            <div className="quiz-header">
                <div className="quiz-header__progress">
                    퀴즈 {currentQuestion + 1}/{questions.length}
                </div>
                <div className="quiz-header__score">점수: {score}</div>
            </div>
    )
}

export default QuizHeader;

