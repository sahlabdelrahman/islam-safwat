/** @format */

import { CircularProgress, Container } from "@mui/material";

const Loader = () => {
  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Container>
  );
};

export default Loader;
