/** @format */

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Item from "./Item";
import Reorder from "components/Dashboard/Reorder";

import { Typography } from "@mui/material";

import "css/Project/index.css";

const AddItem = lazy(() => import("./AddItem"));

const ProjectComponent = ({
  items,
  reorderItems,
  droppableId,
  deleteItem,
  editItem,
  addItem,
  text,
}) => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <div className="items-component">
      {isLoggedIn && (
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
            flag="project"
          />
        </Suspense>
      )}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1900: 4 }}
      >
        <Masonry gutter="8px">
          {items.length > 0 ? (
            items.map((item) => (
              <Item
                key={item._id}
                propsOfItem={item}
                deleteItem={deleteItem}
                editItem={editItem}
                text={text}
              />
            ))
          ) : (
            <Typography variant="body1">
              {/* No projects to show! */}
            </Typography>
          )}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default ProjectComponent;
