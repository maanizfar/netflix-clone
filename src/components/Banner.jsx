import React, { useState, useEffect } from "react";
import requests from "../request";
import axios from "../axios";
import "./Banner.css";

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(requests.fetchNetflixOriginals);

      const mov =
        response.data.results[
          Math.floor(Math.random() * response.data.results.length)
        ];

      setMovie(mov);
    }

    fetchData();
  }, []);

  const truncate = (string, maxLength = 50) => {
    if (!string) return null;
    if (string.length <= maxLength) return string;
    return `${string.substring(0, maxLength)}...`;
  };

  if (movie === null) return <p>loading...</p>;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: "top center",
      }}
    >
      <div className="banner__content">
        <h2 className="banner__title">
          {movie["title"] || movie["original_name"]}
        </h2>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">More Info</button>
        </div>
        <p className="banner__description">{truncate(movie.overview, 120)}</p>
      </div>

      <div className="banner__fadeBottom"></div>
    </header>
  );
};

export default Banner;
