import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import WeatherData from "./weatherData.component";

const WeatherBox = () => {
  const inputValue = useRef();
  const [cityName, setCityName] = useState("delhi");
  const [error, setError] = useState(true);
  const [lang, setLang] = useState(true);
  const [myData, setMyData] = useState([]);
  const [cityDetails, setCityDetails] = useState([]);
  const [dataWeather, setDataWeather] = useState([]);
  const [windData, setWindData] = useState([]);
  const APP_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=54cdddc243517ec9ed2e7dfb10902a5d&units=metric&lang=${
          lang ? "en" : "hi"
        }`
      );
      const data = await response.json();
      if (response.ok) {
        setCityDetails(data.city);
        setMyData(data.list[0].main);
        setDataWeather(data.list[0].weather[0]);
        setWindData(data.list[0].wind);
        setError(true);
      } else {
        setError(false);
      }
    })();
  }, [cityName, lang]);

  const onkeydownHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCityName(inputValue.current.value);
    }
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setCityName(inputValue.current.value);
  };

  return (
    <div className="box">
      <div className="cityName">
        {error ? (
          <p>
            {cityDetails.name}, {cityDetails.country}
            <a
              href={`https://en.wikipedia.org/wiki/${cityDetails.name}`}
              target="_ "
            >
              <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </p>
        ) : (
          <p className="invalid">
            {lang ? "Invalid City Name" : "अमान्य शहर का नाम"}
          </p>
        )}
        <div className="search">
          <input
            type="text"
            ref={inputValue}
            onKeyDown={onkeydownHandler}
            placeholder="City Name"
          />
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={onSubmitHandler}
            icon={faSearch}
          />
        </div>
      </div>
      <WeatherData
        weatherData={myData}
        weather={dataWeather}
        city={cityDetails}
        lang={lang}
        windData={windData}
      />
      <button onClick={() => setLang(!lang)} className="translater">
        {lang ? "Hindi" : "Eng"}
      </button>
    </div>
  );
};

export default WeatherBox;
