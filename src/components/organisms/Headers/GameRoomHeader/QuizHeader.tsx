import { Quiz } from "../../../../types/quiz";

interface QuizHeaderProps {
    currentQuestion: string;
    quiz: Quiz;
    timeLeft: number;
}

const QuizHeader = ({currentQuestion, quiz, timeLeft}: QuizHeaderProps) => {

    return (
            <div className="quiz-header">
                <div className="quiz-header__progress">
                    퀴즈 {Number(currentQuestion)}/{Object.keys(quiz.quizText).length}
                </div>
                <div className="quiz-header__score">{`시간: ${timeLeft}s`}</div>
            </div>
    )
}

export default QuizHeader;

