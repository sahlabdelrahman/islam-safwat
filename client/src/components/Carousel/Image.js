/** @format */

import { Cloudinary } from "@cloudinary/url-gen";

const Image = ({ propsOfItem }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dvkdsstp7",
    },
  });

  const myImage = cld
    .image(propsOfItem.imageId)
    .format("webp")
    .quality(80)
    .toURL();

  return (
    <>
      <img
        data-src={myImage}
        // alt={propsOfItem?.caption ? propsOfItem.caption : propsOfItem.imageId}
        loading="lazy"
        className="image swiper-lazy"
      />
    </>
  );
};

export default Image;
