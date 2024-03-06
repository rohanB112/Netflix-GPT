import React from "react";
import { UseSelector, useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestions = () => {
  const gptMovies = useSelector((store) => store.gpt.gptMovies);
  const movieNames = useSelector((store) => store.gpt.movieNames);

  if (!movieNames) return;
  return (
    <div className="px-4 mx-4 my-14 bg-black text-white bg-opacity-90">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={gptMovies[index]}
          />
        ))}
        <MovieList />
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
