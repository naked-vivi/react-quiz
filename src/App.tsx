import Header from "./components/Header"
import Page from "./components/Page"
import Loader from "./components/Loader";
import ErrorMessage from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";
import Footer from "./components/Footer";
import useQuiz from "./context/useQuiz";

function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Page >
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && <StartScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        }
        {status === "finished" && <FinishScreen />}
      </Page>
    </div>
  )
}

export default App
