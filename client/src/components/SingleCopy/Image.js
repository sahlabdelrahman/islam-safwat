/** @format */

import { Cloudinary } from "@cloudinary/url-gen";
import {
  AdvancedImage,
  lazyload,
  // accessibility,
  responsive,
  // placeholder,
} from "@cloudinary/react";

const Image = ({ propsOfItem }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dvkdsstp7",
    },
  });

  const myImage = cld.image(propsOfItem.imageId).format("webp").quality(4);
  // const myUrl = myImage.toURL();
  // return (
  //   <img
  //     width={propsOfItem.width}
  //     height={propsOfItem.height}
  //     src={myUrl}
  //     alt={propsOfItem?.caption ? propsOfItem.caption : propsOfItem.imageId}
  //     loading="lazy"
  //     className="image"
  //   />
  // );
  return (
    <AdvancedImage
      width={propsOfItem.width}
      height={propsOfItem.height}
      cldImg={myImage}
      alt={propsOfItem?.caption ? propsOfItem.caption : propsOfItem.imageId}
      plugins={[
        lazyload(),
        // responsive(),
        // placeholder({ mode: "predominant-color" }),
      ]}
      className="image"
    />
  );
};

export default Image;
