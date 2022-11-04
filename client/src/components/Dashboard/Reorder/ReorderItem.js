/** @format */

import { Draggable } from "react-beautiful-dnd";

import Image from "./Image";

const ReorderItem = ({ item, index, flag }) => {
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided) => (
        <div
          className="reorder-item"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="thumbnail">
            {flag === "project" ? (
              <Image imageId={item.cover?.imageId} />
            ) : item.type ? (
              item.type === "image" ? (
                <Image imageId={item.imageId} />
              ) : (
                <p>Text</p>
              )
            ) : (
              <Image imageId={item.imageId} />
            )}
          </div>
          {item.text && <p>{item.text}</p>}
        </div>
      )}
    </Draggable>
  );
};

export default ReorderItem;
