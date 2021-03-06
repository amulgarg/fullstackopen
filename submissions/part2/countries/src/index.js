import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const CountryDetails = ({country}) => {

  const [weather, setWeather] = useState(null);

  useEffect(()=>{
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital}`).then((response) => {
      setWeather(response.data);
    })
  }, [country.capital]);

  return <div>
    <h2>{country.name}</h2>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map(language => <li key={language.iso639_2}>{language.name}</li>)}
    </ul>
    <img src={country.flag} alt={`flag of ${country.name}`} height="100" width="100"/>

    {weather && <div>
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature:</b> {weather.current.temperature} Celcius</p>
      <img src={weather.current?.weather_icons[0]} width="100" height="100" alt="weather in this city"/>
      <p><b>wind:</b> {weather.current.wind_speed} kmph {weather.current.wind_dir} </p>
    </div>}

  </div>;
}

const App = () => {

  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [countriesToView, setCountriesToView] = useState([]);

  useEffect(()=>{
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('response', response);
      setCountries(response.data);
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const showCountryView = (countryCode) => {
    setCountriesToView(countriesToView.concat(countryCode));
  }

  const renderFilteredCounties = () => {
    let filteredCountries = countries;
    if(search!=='')
      filteredCountries = countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()));

    if(filteredCountries.length > 10) return <div>Too many matches, specify another filter</div>;

    if(filteredCountries.length === 1){
      const country = filteredCountries[0];
      return <CountryDetails country={country}/>;
    }

    return <div>{filteredCountries.map(country => {
      return <div key={country.alpha3Code}>
        {country.name} <button onClick={() => showCountryView(country.alpha3Code)}>show</button>
        {countriesToView.includes(country.alpha3Code) ? <CountryDetails country={country}/> : null}
      </div>;
    })}</div>;
  }

  return <div>
    find countries <input type="text" value={search} onChange={handleSearchChange}/>
    {renderFilteredCounties()}
  </div>;
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
)