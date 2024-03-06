import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute w-screen overflow-hidden aspect-video text-white pt-36 px-12 bg-gradient-to-r from-black">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-md w-2/5">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-12 text-lg rounded-lg hover:bg-opacity-80">
          Play
        </button>
        <button className="mx-2 bg-gray-500 text-white p-4 px-12 text-lg bg-opacity-50 rounded-lg">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
