import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    const nameAlreadyExists = persons.some(person => person.name === newName);

    if(nameAlreadyExists){
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {name: newName, number: newNumber};
      const newPersons = persons.concat(newPerson);
      setPersons(newPersons);
    }

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))