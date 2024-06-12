import React from "react";
import { useDrop } from "react-dnd";

const DropZone = ({ onDrop, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "CARD",
    drop: (item, monitor) => {
      onDrop(item.data); // Callback function that is called when a card is dropped into the drop zone 
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(), // Boolean value that represents whether a card is hovered over the drop zone or not 
    }),
  });

  return (
    <div ref={drop} style={{ minHeight: "100vh", backgroundColor: isOver ? "lightgreen" : "lightgray" }}>
      {children}
    </div>
  );
};

export default DropZone;
