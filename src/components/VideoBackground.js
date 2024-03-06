import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  useMovieTrailer(id);
  const trailer = useSelector((store) => store.movie?.movieTrailer);

  return (
    <div className="w-screen">
      <iframe
        className="w-screen object-cover aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailer?.key +
          "?loop=1&controls=0&autoplay=1&mute=1"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoBackground;
