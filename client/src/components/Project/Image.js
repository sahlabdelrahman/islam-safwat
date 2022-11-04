/** @format */

import { Cloudinary } from "@cloudinary/url-gen";

const Image = ({ propsOfItem }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dvkdsstp7",
    },
  });

  const myImage = cld
    .image(propsOfItem.cover.imageId)
    .format("webp")
    .quality(80)
    .toURL();

  return (
    <img
      width={propsOfItem.cover.width}
      height={propsOfItem.cover.height}
      loading="lazy"
      src={myImage}
      alt={propsOfItem.cover.imageId}
      className="image"
    />
  );
};

export default Image;
