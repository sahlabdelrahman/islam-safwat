/** @format */

import { forwardRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Keyboard } from "swiper/core";
import { Navigation, Lazy } from "swiper";

import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "swiper/css/navigation";
import "swiper/css/lazy";

import "css/Carousel/index.css";
import Image from "./Image";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

SwiperCore.use([Keyboard]);

const Carousel = ({ items, currentSlide, open, handleClose }) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <IconButton onClick={handleClose} className="close-carousel">
        <CloseIcon fontSize="medium" />
      </IconButton>
      <div className="carousel-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          initialSlide={currentSlide}
          lazy={true}
          navigation={true}
          keyboard={true}
          modules={[Lazy, Navigation]}
          className="mySwiper car"
        >
          {items?.map((item) => (
            <SwiperSlide
              className="carousel-item"
              key={item._id}
              style={{ display: item.type === "text" && "none" }}
            >
              <div>
                <Image propsOfItem={item} className="img" />
                <div className="swiper-lazy-preloader swiper-lazy-preloader"></div>
                {item.caption?.length > 1 && (
                  <Typography variant="body1" className="caption">
                    {item.caption}
                  </Typography>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Dialog>
  );
};

export default Carousel;
