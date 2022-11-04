/** @format */

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, lazyload, responsive } from "@cloudinary/react";

const Image = ({ imageId }) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dvkdsstp7",
    },
  });

  const myImage = cld.image(imageId).format("webp").quality(100);

  return (
    <AdvancedImage
      cldImg={myImage}
      alt={imageId}
      plugins={[lazyload(), responsive()]}
      className="reorder-img"
    />
  );
};

export default Image;
