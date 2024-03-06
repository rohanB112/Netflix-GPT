import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, title }) => {
  return (
    movies && (
      <div>
        <h1 className="text-2xl py-6">{title}</h1>
        <div className="flex overflow-x-scroll no-scrollbar">
          <div className="flex">
            {movies.map(
              (movie) =>
                movie.poster_path && (
                  <MovieCard key={movie.id} posterPath={movie.poster_path} />
                )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
