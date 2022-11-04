/** @format */

import { Grid, Typography } from "@mui/material";

const Content = () => {
  return (
    <Grid item xs={12} md={6} className="content">
      <Typography variant="h3">Let’s talk business</Typography>
      <Typography variant="body1">
        Now that you know a lot about me, let me know if you are interested to
        work with me.
      </Typography>
    </Grid>
  );
};

export default Content;
