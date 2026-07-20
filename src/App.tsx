import { useEffect, useReducer } from "react"
import Header from "./Header"
import Page from "./Page"
import Loader from "./Loader";
import ErrorMessage from "./Error";
import StartScreen from "./StartScreen";

interface question {
  id: number;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
}

type State = {
  questions: question[],
  status: string
}

type Action =
  { type: "dataReceived"; payload: question[]; }
  | { type: "dataFailed" }

const initialState = {
  questions: [],
  status: "loading" //loading, error, ready, active, finished
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" }
    case "dataFailed":
      return { ...state, status: "error" }
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)
  const numQuestions = questions.length;

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
        {status === "ready" && <StartScreen numQuestions={numQuestions} />}
      </Page>
    </div>
  )
}

export default App
