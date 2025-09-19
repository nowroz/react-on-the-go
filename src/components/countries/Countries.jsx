import { Suspense, use, useState } from "react";
import Country from "../country/Country";

const getCountriesPromise = async () => {
  const response = await fetch("https://openapi.programming-hero.com/api/all");

  return response.json();
};

const Countries = () => {
  const countriesPromise = getCountriesPromise();

  return (
    <Suspense fallback={<h1>Loading countries...</h1>}>
      <CountryList countriesPromise={countriesPromise}></CountryList>
    </Suspense>
  );
};

export default Countries;

const CountryList = ({ countriesPromise }) => {
  const result = use(countriesPromise);
  const countries = result.countries;

  // const [visitedCount, setVisitedCount] = useState(0);
  // const [visitStatus, setVisitStatus] = useState(
  //   Array(countries.length).fill(false),
  // );
  const [visitedCountries, setVisitedCountries] = useState([]);
  const [visitedCountriesFlags, setVisitedCountresFlags] = useState([]);

  const removeCountry = (country) => {
    const copyOfVisitedCountries = [...visitedCountries];

    const index = copyOfVisitedCountries.indexOf(country);

    copyOfVisitedCountries.splice(index, 1);

    setVisitedCountries(copyOfVisitedCountries);
  };

  const addCountry = (country) => {
    const copyOfVisitedCountries = [...visitedCountries, country];

    setVisitedCountries(copyOfVisitedCountries);
  };

  const handleVisitedCountries = (country) => {
    if (visitedCountries.includes(country)) removeCountry(country);
    else addCountry(country);
  };

  const handleVisitedCountriesFlags = (flag) => {
    setVisitedCountresFlags([...visitedCountriesFlags, flag]);
  };

  return (
    <div>
      <h1 className="text-center text-4xl mt-10">
        Countries: {countries.length}
      </h1>
      <h2 className="text-center text-gray-400 mb-6">
        Visited: {visitedCountries.length} | Not Visited:
        {countries.length - visitedCountries.length}
      </h2>
      <div className="flex gap-4">
        {visitedCountriesFlags.map((flag) => (
          <img key={flag} className="w-[40px] h-auto" src={flag} alt="" />
        ))}
      </div>
      <ul className="w-max mx-auto list-decimal mb-6">
        {visitedCountries.map((country) => (
          <li key={country.ccn3.ccn3}>{country.name.common}</li>
        ))}
      </ul>
      <div className="grid grid-cols-3 gap-x-4 gap-y-20">
        {countries.map((country) => (
          <Country
            key={country.ccn3.ccn3}
            country={country}
            handleVisitedCountries={handleVisitedCountries}
            handleVisitedCountriesFlags={handleVisitedCountriesFlags}
          ></Country>
        ))}
      </div>
    </div>
  );
};
