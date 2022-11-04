/** @format */
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Grid,
  Dialog,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Content from "./Content";
import Form from "./Form";

import { handleContact } from "store/actions/contact.action";

import "css/Contact/index.css";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Contact = () => {
  const contact = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(handleContact());
  };

  return (
    <Dialog
      fullScreen
      open={contact}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          color: "#000",
          boxShadow: "none",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Divider />
      <section className="contact">
        <Container>
          <Grid container spacing={4}>
            <Content />
            <Form />
          </Grid>
        </Container>
      </section>
    </Dialog>
  );
};

export default Contact;
