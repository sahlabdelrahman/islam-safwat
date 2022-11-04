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
    <img
      width={propsOfItem.width}
      height={propsOfItem.height}
      loading="lazy"
      src={myImage}
      alt={propsOfItem?.caption ? propsOfItem.caption : propsOfItem.imageId}
      className="image"
    />
  );
};

export default Image;
