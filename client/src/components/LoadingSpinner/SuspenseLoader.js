/** @format */

import { CircularProgress } from "@mui/material";

const SuspenseLoader = ({ page }) => {
  return (
    <div className={`suspense-component ${page.length > 0 && page}`}>
      <CircularProgress />
    </div>
  );
};

export default SuspenseLoader;
