import React from "react";

const ImageCard = ({ image, imageCardRef }) => {
  let image_path = "";
  try {
    image_path = require(`../../assets/${image["poster-image"]}`);
  } catch (err) {
    image_path = require(`../../assets/placeholder_for_missing_posters.png`); //set default image path
  }

  return (
    <div ref={imageCardRef} className="max-w-sm rounded  shadow-lg ">
      <img src={image_path} alt="film not found" />
      <div>
        <div className="font-light text-l text-left text-white mt-[24px]">
          {image.name}
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
