import React, { useRef } from "react";
import { useState } from "react";

const DraggableList = ({
  list,
  ItemTemplate,
  containerRef,
  width,
  height,
  onChange,
  containerStyle,
}) => {
  const [isDragging, setisDragging] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [targetIndex, setTargetIndex] = useState(null);
  const [yPosition, setYPosition] = useState(0);
  const listRef= useRef(null)
  width = width ? width : "100%";
  height = height ? height : "100%";

  const startDragging = (event, i) => {
    const offset = listRef.current.offsetTop
    setisDragging(true);
    setSelectedIndex(i);
    setYPosition(event.pageY - offset)
  };
  const stopDragging = (event) => {
    if (isDragging && targetIndex !== null) {
      const newList = [...list];
      newList.splice(targetIndex, 0, newList[selectedIndex]);
      if (targetIndex > selectedIndex) {
        newList.splice(selectedIndex, 1);
      } else {
        newList.splice(selectedIndex + 1, 1);
      }
      onChange(newList);
    }
    setisDragging(false);
    setSelectedIndex(null);
    setTargetIndex(null);
  };

  const selectingTarget = (event, i) => {
    if (isDragging) {
      setTargetIndex(i);
    }
  };
  const startMoving = (event) => {
    const offset = listRef.current.offsetTop
    if (isDragging) {
      setYPosition(event.pageY-offset +20);

    }
  };

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        transition: "0.4s",
        ...containerStyle,
        display: 'grid',
        gridTemplateColumns: '1fr',
        alignItems: 'center',
        justifyItems: 'center',
      }}
      ref={listRef}
      className="draggableListContainer"
      onMouseMove={startMoving}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
    >
      {list.map((item, i) => (
        <div
          key={i}
          onMouseDown={(event) => startDragging(event, i)}
          onMouseUp={stopDragging}
          onMouseEnter={(event) => selectingTarget(event, i)}
          style={{
            userSelect: "none",
            width:'90%',
            height:'90%',
            backgroundColor:'grey',
            ...returnStyle(isDragging, selectedIndex === i, yPosition),
            ...returnTargetStyle(
              isDragging && targetIndex === i && selectedIndex !== i
            ),
          }}
          className="draggableItemCon"
        >
          <ItemTemplate item={item} />
        </div>
      ))}
    </div>
  );
};

const styles = {
  selected: {
    position: "absolute",
    zIndex: "999",
    width: "100%",
    height:'50px',
    overflow:'hidden'
  },
  target: {
    borderTop: "2px solid black",
  },
};
const returnStyle = function (isDragging, isSelected, yPosition) {
  if (isDragging && isSelected) {
    styles.selected.top = yPosition - 5;
    return styles.selected;
  }
};

const returnTargetStyle = function (isTarget) {
  if (isTarget) {
    return styles.target;
  } else {
    return { borderTop: "0px solid black" };
  }
};

export default DraggableList;
