/** @format */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { ckEditorConfig } from "data/static-data";
import {
  showErrorSnackbar,
  showSuccessSnackbar,
  showWarningSnackbar,
} from "store/actions/ui.action";
import { editBio } from "store/actions/bio.action";
import { Button } from "@mui/material";

const Editor = () => {
  const { body, id } = useSelector((state) => state.bio);
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  ClassicEditor.defaultConfig = ckEditorConfig;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) {
      dispatch(showWarningSnackbar("Please write your Bio"));
    } else {
      dispatch(editBio(id, content))
        .then((message) => dispatch(showSuccessSnackbar(message)))
        .catch((message) => dispatch(showErrorSnackbar(message)));
    }
  };

  return (
    <div className="bio-editor">
      <form onSubmit={handleSubmit}>
        <CKEditor
          editor={ClassicEditor}
          onChange={(event, editor) => {
            const data = editor.getData();
            setContent(data);
          }}
          data={body}
          required
        />
        <Button
          type="submit"
          variant="contained"
          className="submit"
          sx={{
            display: "block",
            marginLeft: "auto",
            marginTop: "8px",
            backgroundColor: "#000",
            ":hover": { backgroundColor: "#000" },
          }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Editor;
