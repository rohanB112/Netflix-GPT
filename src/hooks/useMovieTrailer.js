import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTrailer } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (id) => {
  //This hook gets the movie trailer and updates it to our store

  const dispatch = useDispatch();

  useEffect(() => {
    getMovieTrailer();
  }, []);

  const getMovieTrailer = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.results.filter((video) => video.type == "Trailer");
    const movieTrailer = filterData[0];
    dispatch(addMovieTrailer(movieTrailer));
    // console.log(trailer);
  };
};

export default useMovieTrailer;
