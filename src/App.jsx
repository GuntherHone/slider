import React, { useState } from "react";
import styled from "styled-components";
import parseSng from "./parseSng";

import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

const Layout = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: auto auto 1fr;
  grid-template-areas: "header sidebar main" "footer footer footer";
  width: 100vw;
  height: 100vh;
`;

const Main = styled.div`
  grid-area: main;
  background: #111;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
`;

function App() {
  const [songs, setSongs] = useState([]);

  const openFiles = async (event) => {
    const newSongs = await Promise.all(
      [...event.target.files].map(async (file) => {
        const data = await file.text();
        return parseSng(data);
      })
    );

    setSongs([...songs, ...newSongs]);
  };

  const reorderSongs = (sourceIndex, destinationIndex) => {
    const result = Array.from(songs);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    setSongs(result);
  };

  return (
    <Layout>
      <Header addSng={openFiles} />
      <SideBar songs={songs} reorderSongs={reorderSongs} />
      <Main>Main</Main>
      <Footer songs={songs} />
    </Layout>
  );
}

export default App;
