import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({text, value}) => {
    return <tr><td>{text}</td><td>{value}</td></tr>;
}

const Statistics = ({good, neutral, bad}) => {

    if(good == 0 && neutral == 0 && bad == 0) return <p>No feedback given</p>;

    return <div>
        <h2>Statistics</h2>
        <table>
            <Statistic text="good" value={good}/>
            <Statistic text="neutral" value={neutral}/>
            <Statistic text="bad" value={bad}/>
            <Statistic text="all" value={good + neutral + bad}/>
            <Statistic text="average" value={(good - bad) / (good + neutral + bad)}/>
            <Statistic text="positive" value={`${(good) * 100/ (good + neutral + bad)} %`}/>
        </table>
    </div>;
}

const Button = ({text, handleClick}) => {
    return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const updateGood = () => {
      setGood(good+1);
  }

  const updateNeutral = () => {
    setNeutral(neutral+1);
  }

  const updateBad = () => {
    setBad(bad+1);
  }

  return (
    <div>
        <h2>Give feedback</h2>
        <div>
            <Button handleClick={updateGood} text="good"/>
            <Button handleClick={updateNeutral} text="neutral"/>
            <Button handleClick={updateBad} text="bad"/>
        </div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)