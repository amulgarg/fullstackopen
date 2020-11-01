import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistics = ({good, neutral, bad}) => {

    if(good == 0 && neutral == 0 && bad == 0) return <p>No feedback given</p>;
    
    return <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {good + neutral + bad}</p>
        <p>average {(good - bad) / (good + neutral + bad)}</p>
        <p>postive {(good) * 100/ (good + neutral + bad)}%</p>
    </div>
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
        <h3>Give feedback</h3>
        <div>
            <button onClick={updateGood}>good</button>
            <button onClick={updateNeutral}>neutral</button>
            <button onClick={updateBad}>bad</button>
        </div>
        <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)