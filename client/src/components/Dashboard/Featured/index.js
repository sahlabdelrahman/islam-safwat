/** @format */

import { useSelector } from "react-redux";

import { Container, Grid, Typography } from "@mui/material";

import Reorder from "../Reorder";
import AddFeatured from "./AddFeatured";
import FeaturedItem from "./FeaturedItem";

import { reorderFeatured } from "store/actions/featured.action";

import "css/Dashboard/Featured/index.css";

const Featured = () => {
  const featured = useSelector((state) => state.featured);

  return (
    <section className="featured-dashboard">
      <Container>
        <div className="padding-top-for-body"></div>
        <AddFeatured />
        <Reorder
          reorderAction={reorderFeatured}
          items={featured}
          droppableId="featured"
        />
        <Grid container spacing={2}>
          {featured.length > 0 ? (
            featured.map((item) => (
              <FeaturedItem propsOfItem={item} key={item._id} />
            ))
          ) : (
            <Typography variant="body1">
              {/* No Featured images to show! */}
            </Typography>
          )}
        </Grid>
      </Container>
    </section>
  );
};

export default Featured;
