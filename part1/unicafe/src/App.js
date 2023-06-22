import { useState } from "react";

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <p>
        good {props.good}
        <br /> neutral: {props.neutral} <br /> bad: {props.bad} <br /> all:
        {props.all}
        <br /> average: {props.average} <br /> positive: {props.positive}%
      </p>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const positive = good / all;
  const average = (good - bad) / all;

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((n) => (n += 1))}>good</button>
      <button onClick={() => setNeutral((n) => (n += 1))}>neutral</button>
      <button onClick={() => setBad((n) => (n += 1))}>bad</button>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        positive={positive}
        average={average}
      />
    </div>
  );
};

export default App;
