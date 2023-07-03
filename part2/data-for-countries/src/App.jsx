import { useState, useEffect } from "react";
// import CountryList from "./components/CountryList";
import { getAllCountries } from "./services/countries";

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");
  console.log("allCountries", allCountries);
  console.log("filter", filter);

  useEffect(() => {
    getAllCountries()
      .then((initialCountries) =>
        setAllCountries(
          initialCountries
            .filter((initialCountry) => {
              return (
                initialCountry.capital &&
                initialCountry.capital.length > 0 &&
                initialCountry.languages
              );
            })
            .map((country) => {
              return {
                name: country.name.common,
                area: country.area,
                capital: country.capital[0],
                languages: Object.values(country.languages),
                flag: country.flags.svg,
              };
            })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  const onFilterChange = (e) => setFilter(e.target.value);
  // const onSelectCountry = (name) => setFilter(name);

  // THE ERROR OCCURS ON countriesToShow function. Seems like the return value is a function and not an array of objects
  const countriesToShow = () => {
    if (!allCountries) {
      return null;
    }
    return allCountries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  console.log("countriesToShow", countriesToShow);

  return (
    <div>
      <label>Find countries </label>
      <input value={filter} onChange={onFilterChange} />

      {countriesToShow && <div></div>}

      {/* <CountryList
        countries={countriesToShow}
        onSelectCountry={onSelectCountry}
      /> */}
    </div>
  );
}

export default App;
