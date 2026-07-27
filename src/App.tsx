import { useEffect, useReducer } from "react"
import Header from "./components/Header"
import Page from "./components/Page"
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import type { Action, State } from "./type";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";

const initialState: State = {
  questions: [],
  status: "loading", //loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "error" }
    case "start":
      return { ...state, status: "active" }

    case "newAnswer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question?.correctOption
          ? state.points + 1 : state.points
      }
    }

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null }
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore
      }

    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, curr) => prev + curr.points, 0)

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(err => {
        console.error(err);
        dispatch({ type: "dataFailed" });
      })
  }, [])

  return (
    <div className="app">
      <Header />
      <Page >
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch} />}
        {status === "active" &&
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer} />
            <Question question={questions[index]} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </>
        }
        {status === "finished" && <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} highscore={highscore} />}
      </Page>
    </div>
  )
}

export default App
