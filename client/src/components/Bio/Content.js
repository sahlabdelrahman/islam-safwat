/** @format */

import { useSelector } from "react-redux";

import { Grid, Typography } from "@mui/material";

const Content = () => {
  const bio = useSelector((state) => state.bio);

  return (
    <Grid container className="bio-content">
      {!bio && (
        <Typography variant="body1">
          {/* No bio has been added yet */}
        </Typography>
      )}
      {bio?.imageUrl && <img src={bio?.imageUrl} alt="profile" />}
      {bio?.body && <div dangerouslySetInnerHTML={{ __html: bio?.body }}></div>}
    </Grid>
  );
};

export default Content;
