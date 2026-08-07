import { createContext } from "react";
import type { Action, QuizQuestion, QuizStatus } from "../type";

interface QuizContextValue {
    questions: QuizQuestion[];
    status: QuizStatus;
    index: number;
    answer: number | null;
    points: number;
    highscore: number;
    secondRemaining: number;
    numQuestions: number;
    maxPossiblePoints: number;
    dispatch: React.Dispatch<Action>;
}

export const QuizContext = createContext<QuizContextValue | undefined>(undefined);