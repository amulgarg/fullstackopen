import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('response', response);
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const renderFilteredCounties = () => {
    let filteredCountries = countries;
    if(search!=='')
      filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

    if(filteredCountries.length > 10) return <div>Too many matches, specify another filter</div>;

    if(filteredCountries.length === 1){
      const country = filteredCountries[0];
      return <div>
        <h2>{country.name}</h2>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`flag of ${country.name}`} height="100" width="100"/>
      </div>;
    }

    return <div>{filteredCountries.map(country => <div key={country.alpha3Code}>{country.name}</div>)}</div>;
  }

  return <div>
    find countries <input type="text" value={search} onChange={handleSearchChange}/>
    {renderFilteredCounties()}
  </div>;
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);