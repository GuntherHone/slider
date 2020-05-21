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

export default ({ song }) => (
  <Layout>
    {song ? song.Title : "Please add .sng files using the add button..."}
  </Layout>
);
