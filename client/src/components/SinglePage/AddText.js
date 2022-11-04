/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";

import {
  showErrorSnackbar,
  showSuccessSnackbar,
} from "store/actions/ui.action";

const AddText = ({ addText, id }) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addText(text, id, "text"))
      .then((message) => {
        dispatch(showSuccessSnackbar(message));
      })
      .catch((message) => {
        dispatch(showErrorSnackbar(message));
      });
    setText("");
  };

  return (
    <div className="add-image">
      <form onSubmit={handleSubmit}>
        <textarea
          required
          placeholder="Text"
          rows={4}
          // maxLength={2200}
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#000",
            ml: "12px",
            ":hover": { backgroundColor: "#000" },
          }}
        >
          Add text
        </Button>
      </form>
    </div>
  );
};

export default AddText;
