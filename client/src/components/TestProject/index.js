/** @format */

import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";

import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import Item from "./Item";

import { Typography } from "@mui/material";

import "css/Item/index.css";

const AddItem = lazy(() => import("./AddItem"));

const ProjectComponent = ({
  items,

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

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 600: 2, 900: 3, 1400: 4 }}
      >
        <Masonry gutter="8px">
          {items.length > 0 ? (
            items.map((item) => (
              <Item key={item._id} propsOfItem={item} text={text} />
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
