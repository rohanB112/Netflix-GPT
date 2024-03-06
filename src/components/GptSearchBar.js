import React from "react";
import { API_OPTIONS, BG_IMAGE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstants";
import { useRef } from "react";
import openai from "../utils/openai";
import { addGptMovies } from "../utils/gptSlice";

const GptSearchBar = () => {
  const dispatch = useDispatch();

  const searchText = useRef(null);
  const langKey = useSelector((store) => store.config.lang);

  // search movie in TMDB
  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearch = async () => {
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await openai.chat.completions.create({
      messages: [{ role: "user", content: gptQuery }],
      model: "gpt-3.5-turbo",
    });

    console.log(gptResults.choices?.[0]?.message?.content);

    const gptMovies = gptResults.choices?.[0]?.message?.content.split(",");

    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);

    console.log(tmdbResults);

    dispatch(
      addGptMovies({ movieNames: gptMovies, gptMovieResults: tmdbResults })
    );
  };

  return (
    <div>
      <div className="fixed -z-20">
        <img alt="bg_img" src={BG_IMAGE} />
      </div>
      <div className="flex justify-center pt-36">
        <form
          className="bg-black p-3 w-2/4 flex justify-between"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            className="w-full px-3"
            type="text"
            placeholder={lang[langKey].gptSearchPlaceholder}
          ></input>
          <button
            onClick={handleGptSearch}
            className="px-6 py-2 mx-3 bg-red-700 rounded-md text-white hover:bg-red-800"
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GptSearchBar;
