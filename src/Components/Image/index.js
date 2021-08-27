import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Image = ({ image }) => (
  <div>
    <LazyLoadImage
      onClick={image.onClick}
      alt={image.alt}
      src={image.src}
      effect="blur"
      className="card-image"
    />
  </div>
);

export default Image;
