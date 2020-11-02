import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
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

  const renderFilteredPersonsList = () => {
    let filteredPersons = persons;
    if(filter!==''){
      filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));
    }

    return filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
      <h2>Add a new</h2>
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
      {renderFilteredPersonsList()}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))