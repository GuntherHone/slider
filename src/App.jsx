import React, { useState } from "react";
import styled from "styled-components";
import JSZip from "jszip";

import parseSng from "./parseSng";
import parseCol from "./parseCol";

import Main from "./Main";
import Header from "./Header";
import ControlPanel from "./ControlPanel";
import SideBar from "./SideBar";
import Footer from "./Footer";

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: auto auto 1fr;
  grid-template-areas: "header header header" "controlpanel sidebar main" "footer footer footer";
  width: 100vw;
  height: 100vh;
`;

function App() {
  const [songs, setSongs] = useState([]);
  const [selectedSongIndex, setSelectedSongIndex] = useState(0);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [scheduleName, setScheduleName] = useState("untitled");

  function resetState() {
    setSongs([]);
    setSelectedSongIndex(0);
    setSelectedSlideIndex(0);
    setScheduleName("untitled");
  }

  function setFocus() {
    document.activeElement.blur();
  }

  const openSngFiles = async (event) => {
    const newSongs = await Promise.all(
      [...event.target.files].map(async (file) => {
        const data = await file.text();
        return parseSng(data, file.name.split(".").slice(0, -1).join("."));
      })
    );

    setSongs([...songs, ...newSongs]);

    setFocus();
  };

  const openZip = async (event) => {
    if (!event.target.files.length) return;
    event.persist();
    const zip = await JSZip.loadAsync(event.target.files[0]);
    const scheduleFile = await zip.file("Schedule.col").async("text");

    resetState();

    setScheduleName(
      event.target.files[0].name.split(".").slice(0, -1).join(".")
    );

    const scheduleSongs = parseCol(scheduleFile).items.filter(
      ({ FileName }) => FileName
    );

    let newSongs = await Promise.all(
      scheduleSongs.reduce((acc, { FileName }) => {
        acc.push(zip.file(`Songs/${FileName}`).async("text"));
        return acc;
      }, [])
    );

    setSongs(
      newSongs.map((song, i) => parseSng(song, scheduleSongs[i].Caption))
    );

    setFocus();
  };

  const reorderSongs = (sourceIndex, destinationIndex) => {
    const result = Array.from(songs);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    setSongs(result);
    if (sourceIndex === selectedSongIndex) {
      setSelectedSongIndex(destinationIndex);
    } else if (
      sourceIndex < selectedSongIndex &&
      destinationIndex >= selectedSongIndex
    ) {
      setSelectedSongIndex(selectedSongIndex - 1);
    } else if (
      sourceIndex > selectedSongIndex &&
      destinationIndex <= selectedSongIndex
    ) {
      setSelectedSongIndex(selectedSongIndex + 1);
    }
  };

  const doSelect = ({ songIndex, slideIndex }) => {
    songIndex >= 0 &&
      songIndex < songs.length &&
      setSelectedSongIndex(songIndex);
    setSelectedSlideIndex(slideIndex);
  };

  return (
    <Layout>
      <Header title={scheduleName} />
      <ControlPanel addSng={openSngFiles} addZip={openZip} />
      <SideBar
        songs={songs}
        reorderSongs={reorderSongs}
        selectedSong={selectedSongIndex}
        selectedSlide={selectedSlideIndex}
        doSelect={doSelect}
      />
      <Main song={songs[selectedSongIndex]} slideIndex={selectedSlideIndex} />
      <Footer songs={songs} />
    </Layout>
  );
}

export default App;
