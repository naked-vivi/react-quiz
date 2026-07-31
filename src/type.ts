import type { Dispatch } from "react";

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

export type QuizStatus = "loading" | "error" | "ready" | "active" | "finished";

export type State = {
  questions: QuizQuestion[];
  status: QuizStatus;
  index: number;
  answer: number | null;
  points: number;
  highscore: number;
  secondRemaining: number;
};

export type Action =
  | { type: "dataReceived"; payload: QuizQuestion[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "restart" }
  | { type: "tick" };

export type AppDispatch = Dispatch<Action>;

export type ProgressProps = {
  index: number;
  numQuestions: number;
  points: number;
  maxPossiblePoints: number;
  answer: number | null;
};
