import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  grid-area: main;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
`;

const Slide = ({ verseId, verse }) => (
  <pre
    style={{
      fontFamily: "sans-serif",
      textAlign: "center",
      lineHeight: "1.75em",
    }}
  >
    {verseId}
    <br></br>
    <br></br>
    {verse[0]}
  </pre>
);

export default ({ song, slideIndex }) => (
  <Layout>
    {song ? (
      <Slide
        verse={song.verses[song.VerseOrder[slideIndex]]}
        verseId={song.VerseOrder[slideIndex]}
      />
    ) : (
      "Please add .sng files using the add button..."
    )}
  </Layout>
);
