import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movie);

  return (
    <div className="bg-black text-white">
      <div className="px-10 -mt-52 relative z-30 pb-24">
        <MovieList
          movies={movies.nowPlayingMovies}
          title={"Now Playing Movies"}
        />
        <MovieList movies={movies.topRatedMovies} title={"Top Rated Movies"} />
        <MovieList movies={movies.popularMovies} title={"Popular Movies"} />
        <MovieList movies={movies.upcomingMovies} title={"Upcoming Movies"} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
