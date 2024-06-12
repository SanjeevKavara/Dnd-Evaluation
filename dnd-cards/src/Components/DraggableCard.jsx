import React from "react";
import { useDrag } from "react-dnd";
import ActionAreaCard from "./Card";

const DraggableCard = ({ data }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: { data },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <ActionAreaCard data={data} />
    </div>
  );
};

export default DraggableCard;
