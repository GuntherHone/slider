import React from "react";
import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import SongItem from "./SongItem";

const Layout = styled.div`
  grid-aread: sidebar;
  background: #222;
  width: 260px;
  overflow: auto;
  height: 100%;
`;

export default ({ songs, reorderSongs, selectedSong, selectedSlide }) => {
  const dragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorderSongs(result.source.index, result.destination.index);
  };

  return (
    <Layout>
      <DragDropContext onDragEnd={dragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {songs.map((song, index) => (
                <SongItem
                  provided={provided}
                  snapshot={snapshot}
                  song={song}
                  index={index}
                  key={song.Title + index}
                ></SongItem>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Layout>
  );
};
