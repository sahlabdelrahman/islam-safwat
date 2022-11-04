/** @format */

import { useState, useEffect } from "react";
import { Grow } from "@mui/material";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

import "css/Buttons/index.css";

const GoTopButton = () => {
  const [showGoTop, setShowGoTop] = useState(false);
  const handleVisibleButton = () => {
    setShowGoTop(window.pageYOffset > 50);
  };

  const handleScrollUp = () => {
    window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const cleanup = window.addEventListener("scroll", handleVisibleButton);

    return () => cleanup;
  }, []);

  return (
    <Grow in={showGoTop} timeout={500}>
      <div className="go-top-button" onClick={handleScrollUp}>
        <button type="button">
          <ExpandLessOutlinedIcon />
        </button>
      </div>
    </Grow>
  );
};

export default GoTopButton;
