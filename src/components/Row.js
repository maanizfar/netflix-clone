import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
// {
//   backdrop_path: "/mGVrXeIjyecj6TKmwPVpHlscEmw.jpg";
//   first_air_date: "2019-07-25";
//   genre_ids: (2)[(10759, 10765)];
//   id: 76479;
//   name: "The Boys";
//   origin_country: ["US"];
//   original_language: "en";
//   original_name: "The Boys";
//   overview: "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.";
//   popularity: 1450.208;
//   poster_path: "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg";
//   vote_average: 8.3;
//   vote_count: 1197;
// }

const Row = ({ title, fetchUrl, portrait }) => {
  const [data, setData] = useState(null);

  const posterBaseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setData(response.data.results);
    }

    fetchData();
  }, [fetchUrl]);

  console.log(data);

  if (data === null) return <p>loading...</p>;

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {data.map((movie) => (
          <img
            className={`row__poster ${portrait && "portrait"}`}
            key={movie.id}
            src={`${posterBaseUrl}${
              portrait ? movie["poster_path"] : movie["backdrop_path"]
            }`}
            alt={movie.name || movie.title}
          />
        ))}
      </div>
    </div>
  );
};

export default Row;
