interface startScreenProps {
    numQuestions: number;
}

function StartScreen({ numQuestions }: startScreenProps) {
    return (
        <div className="start">
            <h2 className="">Welcome to The React Quiz!</h2>
            <h3 className="">{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui">Let's start</button>
        </div>
    )
}

export default StartScreen