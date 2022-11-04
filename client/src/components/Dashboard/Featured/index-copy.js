/** @format */

import { useSelector } from "react-redux";

import { Container, ImageList, ImageListItem, Typography } from "@mui/material";

import AddFeatured from "./AddFeatured";
import FeaturedItem from "./FeaturedItem";

import "css/Dashboard/Featured/index.css";

const Featured = ({ loading }) => {
  const featured = useSelector((state) => state.featured);

  return (
    <section className="featured-dashboard">
      <Container>
        <AddFeatured />
        {featured.length > 0 ? (
          <ImageList cols={3} variant="masonry">
            {featured.map((item) => (
              <ImageListItem key={item._id}>
                <img
                  src={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                  srcSet={`${item.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.imageUrl}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography variant="body1">
            {/* No Featured images to show! */}
          </Typography>
        )}
      </Container>
    </section>
  );
};

export default Featured;
