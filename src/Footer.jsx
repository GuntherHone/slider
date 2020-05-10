import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  grid-area: footer;
  background: rgb(0, 120, 250);
  font-size: 0.75em;
  font-weight: bold;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
`;

const FooterItem = styled.span`
  padding: 0px 20px;
`;

export default ({ songs }) => (
  <Layout>
    <FooterItem>Number of songs: {songs.length}</FooterItem>
    <FooterItem>
      Number of slides:{" "}
      {songs.reduce((acc, song) => acc + song.VerseOrder.length, 0)}
    </FooterItem>
  </Layout>
);
