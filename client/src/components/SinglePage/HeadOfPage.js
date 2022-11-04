/** @format */

import { Skeleton, Typography } from "@mui/material";

const HeadOfPage = ({ title, description, loading }) => {
  return (
    <div className="head-of-page">
      <Typography variant="h3">
        {loading ? <Skeleton animation="wave" /> : title}
      </Typography>
      <Typography variant="h5">
        {loading ? <Skeleton animation="wave" /> : description}
      </Typography>
    </div>
  );
};

export default HeadOfPage;
