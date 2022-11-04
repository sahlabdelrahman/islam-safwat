/** @format */

import { useSelector } from "react-redux";
import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Lazy } from "swiper";

import "css/Featured/FeaturedCarousel.css";
import "swiper/css/effect-fade";
import "swiper/css/lazy";
import { CircularProgress, Container, Typography } from "@mui/material";
import Image from "./Image";
import CarouselLoader from "components/LoadingSpinner/CarouselLoader";

const FeaturedCarousel = () => {
  const featured = useSelector((state) => state.featured);
  const [loading, setLoading] = useState(true);

  return (
    <div className="featured-carousel">
      {featured.length > 0 ? (
        <Swiper
          lazy={true}
          spaceBetween={30}
          centeredSlides={true}
          effect={"fade"}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Lazy, Autoplay, EffectFade]}
          className="mySwiper"
        >
          {featured?.map((item, index) => (
            <SwiperSlide key={item._id}>
              <div
                className="carousel-loader"
                style={{
                  display: loading ? "flex" : "none",
                }}
              >
                <CircularProgress />
              </div>

              <img
                src={item.imageUrl}
                alt={item.imageId}
                style={{ display: loading ? "none" : "block" }}
                onLoad={() => {
                  if (index === featured?.length - 1) {
                    setLoading(false);
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Container sx={{ my: "72px" }}>
          <Typography variant="body1">{/* No images to show! */}</Typography>
        </Container>
      )}
    </div>
  );
};

export default FeaturedCarousel;
