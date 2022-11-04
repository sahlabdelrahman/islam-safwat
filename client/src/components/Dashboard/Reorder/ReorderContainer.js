/** @format */

import { DragDropContext, Droppable } from "react-beautiful-dnd";

import ReorderItem from "./ReorderItem";

const ReorderContainer = ({
  reorderedItems,
  setReorderedItems,
  droppableId,
  flag,
}) => {
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    let add;
    let active = reorderedItems;

    // Source Logic
    if (source.droppableId === droppableId) {
      add = active[source.index];
      active.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === droppableId) {
      active.splice(destination.index, 0, add);
    }

    setReorderedItems(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className="reorder-container"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {reorderedItems.length > 0 ? (
              reorderedItems.map((item, index) => (
                <ReorderItem
                  item={item}
                  key={item._id}
                  index={index}
                  flag={flag}
                />
              ))
            ) : (
              <p>{/* No Featured images to reorder! */}</p>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ReorderContainer;
