import { useState } from "react";
import "./Country.css";

const Country = ({
  country,
  handleVisitedCountries,
  handleVisitedCountriesFlags,
}) => {
  const {
    name: { official: countryName },
    flags: {
      flags: { svg: flagImage, alt },
    },
    capital: { capital },
    area: { area },
  } = country;

  const [hasVisited, setHasVisited] = useState(false);

  const handleClick = () => {
    setHasVisited(!hasVisited);

    handleVisitedCountries(country);
  };

  return (
    <div className="flex gap-4 items-start country">
      <img src={flagImage} alt={alt} className="w-[130px] h-auto" />
      <div className="">
        <h1>{countryName}</h1>
        <p className="text-xs text-gray-500">Capital: {capital[0]}</p>
        <p className="text-sm">
          Area: {area} | {area > 300000 ? "Big" : "Small"}
        </p>
        <div className="flex gap-4 m-5 ">
          <button
            onClick={handleClick}
            className={`btn btn-primary border-none shadow-none ${hasVisited && "bg-green-500"}`}
          >
            {hasVisited ? "Visited" : "Not Visited"}
          </button>
          <button
            onClick={() => handleVisitedCountriesFlags(country.flags.flags.svg)}
            className="btn btn-primary border-none shadow-none"
          >
            Add Country Flag
          </button>
        </div>
      </div>
    </div>
  );
};

export default Country;
