import React, { useState, useEffect } from 'react';
import Weathercard from './weathercard';
import './style1.css';

const Temp = () => {
  const [searchValue, setSearchValue] = useState('australia');
  const [tempInfo, setTempInfo] = useState("");

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=54cdddc243517ec9ed2e7dfb10902a5d`;

      let res = await fetch(url);
      let data = await res.json();
      const {temp,humidity,pressure} = data.main;
      const {main: weathermood} = data.weather[0];
      const {name} = data;
      const {speed} = data.wind;
      const { country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="searchInput"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Corrected here
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo} // Corrected here
          >
            search
          </button>
        </div>
      </div>
      {/* our temp card */}
      <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
