/** @format */

import { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Carousel from "components/Carousel";
import Reorder from "components/Dashboard/Reorder";
import Item from "./Item";

import { Typography } from "@mui/material";

import "css/Project/index.css";
const AddItem = lazy(() => import("./AddItem"));

const SinglesComponentCopy = ({
  items,
  reorderItems,
  addItem,
  deleteItem,
  editItem,
  droppableId,
  text,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [currentSlide, setCurrentSlide] = useState(null);

  return (
    <div>
      <Carousel
        currentSlide={currentSlide}
        items={items}
        open={open}
        handleClose={handleClose}
      />
      {/* {isLoggedIn && (
        <Suspense fallback={<p>Add {text} is loading...</p>}>
          <AddItem addItem={addItem} />
        </Suspense>
      )}
      {isLoggedIn && (
        <Suspense fallback={<p>Reorder {text} is loading...</p>}>
          <Reorder
            reorderAction={reorderItems}
            items={items}
            droppableId={droppableId}
          />
        </Suspense>
      )} */}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3 }}>
        <Masonry gutter="8px">
          {items.length > 0 ? (
            items.map((item, index) => (
              <Item
                key={item._id}
                propsOfItem={item}
                setCurrentSlide={setCurrentSlide}
                index={index}
                handleClickOpen={handleClickOpen}
                deleteItem={deleteItem}
                editItem={editItem}
              />
            ))
          ) : (
            <Typography variant="body1">{/* No images to show! */}</Typography>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default SinglesComponentCopy;
