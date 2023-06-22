import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>
        {props.value} {props.text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
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
