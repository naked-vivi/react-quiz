import { useContext } from 'react'
import { QuizContext } from './QuizContext'

function useQuiz() {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error("useQuiz is using out of QuizContext")
    }
    return context
}

export default useQuiz