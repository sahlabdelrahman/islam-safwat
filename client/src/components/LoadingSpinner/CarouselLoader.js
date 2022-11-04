/** @format */

import { CircularProgress } from "@mui/material";

import "css/LoadingSpinner/index.css";

const CarouselLoader = () => {
  return (
    <div className="carousel-loader">
      <CircularProgress />
    </div>
  );
};

export default CarouselLoader;
