/** @format */

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { LazyLoadImage } from "react-lazy-load-image-component";

const Item = ({ propsOfItem }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <motion.div layout="true" className="image-item">
      {isLoggedIn ? (
        <div>
          <LazyLoadImage
            loading="lazy"
            src={propsOfItem.cover.imageUrl}
            alt={propsOfItem.cover.imageId}
            effect="blur"
          />
          <div className="overlay">
            <Link to={`${propsOfItem._id}`}>
              <div className="title-and-description">
                <h3>{propsOfItem.title}</h3>
                <p>{propsOfItem.description}</p>
              </div>
            </Link>
            {/* {!isLoggedIn && (
            <div className="share-buttons">
              <SocialMediaShare
                url={`islamsafwat.com/#/projects/${propsOfItem._id}`}
                quote={`${propsOfItem.title}`}
              />
            </div>
          )} */}
          </div>
        </div>
      ) : (
        <Link to={`${propsOfItem._id}`}>
          <LazyLoadImage
            loading="lazy"
            src={propsOfItem.cover.imageUrl}
            alt={propsOfItem.cover.imageId}
            effect="blur"
          />
          <div className="overlay">
            <div className="title-and-description">
              <h3>{propsOfItem.title}</h3>
              <p>{propsOfItem.description}</p>
            </div>
            {/* {!isLoggedIn && (
            <div className="share-buttons">
              <SocialMediaShare
                url={`islamsafwat.com/#/projects/${propsOfItem._id}`}
                quote={`${propsOfItem.title}`}
              />
            </div>
          )} */}
          </div>
        </Link>
      )}
    </motion.div>
  );
};

export default Item;
