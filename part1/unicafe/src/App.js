import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood((n) => (n += 1))}>good</button>
      <button onClick={() => setNeutral((n) => (n += 1))}>neutral</button>
      <button onClick={() => setBad((n) => (n += 1))}>bad</button>
      <h1>statistics</h1>
      <p>
        good {good}
        <br /> neutral: {neutral} <br /> bad: {bad}
      </p>
    </div>
  );
};

export default App;
