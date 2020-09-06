import React, { useEffect, useState } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, portrait }) => {
  const [data, setData] = useState(null);
  const [trailerUrl, setTrailerUrl] = useState("");

  const posterBaseUrl = "https://image.tmdb.org/t/p/original/";

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setData(response.data.results);
    }

    fetchData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          const id = urlParams.get("v");
          setTrailerUrl(id);
        })
        .catch((error) => console.log(error));
    }
  };

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
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
