/** @format */

const Image = ({ propsOfItem }) => {
  return <img src={propsOfItem.imageUrl} alt={propsOfItem.imageId} />;
};

export default Image;
