/* eslint-disable react/prop-types */
import Weather from './Weather'

function Country({ name, area, capital, languages, flag }) {
  return (
    <>
      <h2>{name}</h2>
      <div>Capital: {capital}</div>
      <div>Area: {area} km²</div>
      <p><b>Languages:</b></p>
      <ul>
        {languages.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img className='flag' src={flag} alt={name} />

      {/* <Weather city={capital} /> */}
    </>
  )
}

export default Country