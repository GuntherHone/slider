import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { CSSTransition } from "react-transition-group";
import KeyboardEventHandler from "react-keyboard-event-handler";

import "./SongItem.css";

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  marginBottom: "8px",
  backgroundColor: isDragging ? "rgb(0,120,210)" : "transparent",
  boxShadow: isDragging ? "3px 3px 5px rgba(0,0,0,0.5)" : "none",
  fontSize: "0.82em",
  fontWeight: "bold",
  ...draggableStyle,
});

const Icon = ({ onClick }) => (
  <svg
    viewBox="0 0 40 40"
    height="1em"
    style={{ cursor: "pointer" }}
    onClick={onClick}
  >
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

export default ({ song, index, provided, snapshot, selected, doSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Draggable
      key={song.CCLI || "undefined" + index}
      draggableId={song.CCLI || "undefined" + index}
      index={index}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div
            onClick={() => {
              !selected && doSelect({ songIndex: index, slideIndex: 0 });
            }}
            style={{
              background: snapshot.isDragging
                ? "transparent"
                : selected
                ? "#444"
                : "transparent",
              padding: "5px 5px",
            }}
          >
            <CSSTransition in={expanded} timeout={2000} classNames="expander">
              <Icon onClick={() => setExpanded(!expanded)} />
            </CSSTransition>
            {song.Title}
          </div>
          {expanded &&
            song.VerseOrder.map((verse, index) => (
              <p style={{ padding: "0px 20px" }} key={index}>
                {verse}
              </p>
            ))}
          <KeyboardEventHandler
            handleKeys={["left", "right", "space"]}
            onKeyEvent={(key, e) => {
              if (selected) {
                switch (key) {
                  case "right":
                    setExpanded(true);
                    break;
                  case "left":
                    setExpanded(false);
                    break;
                  case "space":
                    setExpanded(!expanded);
                    break;
                  default:
                    break;
                }
              }
            }}
          />
        </div>
      )}
    </Draggable>
  );
};
