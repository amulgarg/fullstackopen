import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const getRandomIndex = max => Math.floor(Math.random() * Math.floor(max));

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(props.anecdotes.map(() => 0));

  const setNextAnectode = () => {
    setSelected(getRandomIndex(props.anecdotes.length));
  }

  const updateVotesForAnectode = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
  }

  const getAnectodeWithMaxVotes = () => {
    let max = 0;
    votes.forEach((element, index) => {
      if(element > votes[max]) max = index;
    });
    return max;
  }

  const max = getAnectodeWithMaxVotes();

  return (
    <div>
      <h2>Anectode of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={updateVotesForAnectode}>vote</button>
      <button onClick={setNextAnectode}>next anecdote</button>

      <h2>Anectode with most votes</h2>
      <p>{props.anecdotes[max]}</p>
      <p>has {votes[max]} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)