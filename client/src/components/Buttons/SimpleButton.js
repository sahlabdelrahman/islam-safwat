/** @format */

const { Button } = require("@mui/material");

const SimpleButton = ({ text, handleClick }) => {
  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: "#000",
        ":hover": { backgroundColor: "#000" },
      }}
      onClick={handleClick}
    >
      {text}
    </Button>
  );
};

export default SimpleButton;
