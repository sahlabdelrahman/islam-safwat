/** @format */

import { Container, Typography } from "@mui/material";
import "css/NoPage/index.css";

const NoPage = () => {
  return (
    <div className="no-page">
      <Container>
        <Typography variant="h5">
          You've landed on a wrong planet: 404
        </Typography>
      </Container>
    </div>
  );
};

export default NoPage;
