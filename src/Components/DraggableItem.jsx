import React from "react";

const DraggableItem = ({ item }) => {
  return (
    <div className="itemContainer">
      <h2 className="taskName">{item.taskName} </h2>
      <h3 className="taskDescription">{item.description}</h3>
      <button onClick={() => console.log(item.taskName + " clicked")}>click me</button>
    </div>
  );
};

export default DraggableItem;
