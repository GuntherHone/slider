import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CSSTransition } from "react-transition-group";

import "./SongItem.css";

const getItemStyle = (isDragging, draggableStyle, isSelected) => ({
  userSelect: "none",
  marginBottom: "8px",
  padding: "5px 10px",
  backgroundColor: isDragging
    ? "rgb(0,120,210)"
    : isSelected
    ? "#444"
    : "transparent",
  boxShadow: isDragging ? "3px 3px 5px rgba(0,0,0,0.5)" : "none",
  fontSize: "0.82em",
  fontWeight: "bold",
  ...draggableStyle,
});

const Icon = () => (
  <svg viewBox="0 0 40 40" height="1em" style={{ cursor: "pointer" }}>
    <polyline
      points="10 5 25 20 10 35"
      fill="none"
      stroke="white"
      strokeWidth="4px"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default ({ song, index, provided, snapshot }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Draggable
      key={song.CCLI + index}
      draggableId={song.CCLI + index}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style,
            false
          )}
        >
          <span onClick={() => setExpanded(!expanded)}>
            <CSSTransition in={expanded} timeout={2000} classNames="expander">
              <Icon />
            </CSSTransition>
            {song.Title}
          </span>
          {expanded &&
            song.VerseOrder.map((verse, index) => (
              <p style={{ padding: "0px 20px" }} key={index}>
                {verse}
              </p>
            ))}
        </div>
      )}
    </Draggable>
  );
};
