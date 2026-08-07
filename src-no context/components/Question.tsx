import Option from "./option";
import type { AppDispatch, QuizQuestion } from "../type";

interface questionProps {
    question: QuizQuestion;
    dispatch: AppDispatch;
    answer: number | null;
}

function Question({ question, dispatch, answer }: questionProps) {
    return (<>
        <h4>{question.question}</h4>
        <Option question={question} dispatch={dispatch} answer={answer} />
    </>
    )
}

export default Question
