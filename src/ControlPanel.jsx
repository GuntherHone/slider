import React from "react";
import styled from "styled-components";
import FileInputButton from "./FileInputButton";

import "./ControlPanel.css";

const Layout = styled.div`
  grid-area: controlpanel;
  background: #333;
  padding: 0 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  & > * {
    margin: 10px 0px;
  }
`;

const AddFileIcon = ({ extension, title }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="1.75em"
    viewBox="0 0 24 24"
    fill="#999"
    className="svgicon"
  >
    <title>{title}</title>
    <text x="2" y="20" style={{ fontSize: "10px" }}>
      {extension}
    </text>
    <path d="m17.5 13c-3.584 0-6.5-2.916-6.5-6.5s2.916-6.5 6.5-6.5 6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-12c-3.032 0-5.5 2.467-5.5 5.5s2.468 5.5 5.5 5.5 5.5-2.467 5.5-5.5-2.468-5.5-5.5-5.5z"></path>
    <path d="m17.5 10c-.276 0-.5-.224-.5-.5v-6c0-.276.224-.5.5-.5s.5.224.5.5v6c0 .276-.224.5-.5.5z"></path>
    <path d="m20.5 7h-6c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h6c.276 0 .5.224.5.5s-.224.5-.5.5z"></path>
    <path d="m17.5 24h-15c-1.379 0-2.5-1.122-2.5-2.5v-19c0-1.378 1.121-2.5 2.5-2.5h7c.276 0 .5.224.5.5s-.224.5-.5.5h-7c-.827 0-1.5.673-1.5 1.5v19c0 .827.673 1.5 1.5 1.5h15c.827 0 1.5-.673 1.5-1.5v-6c0-.276.224-.5.5-.5s.5.224.5.5v6c0 1.378-1.121 2.5-2.5 2.5z"></path>
  </svg>
);

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    fill="#999"
    height="1.75em"
    className="svgicon"
  >
    <title>Export to presentation...</title>
    <path d="M400,304.005c-8.832,0-16,7.168-16,16v144H32v-352h144c8.832,0,16-7.168,16-16c0-8.832-7.168-16-16-16H16    c-8.832,0-16,7.168-16,16v384c0,8.832,7.168,16,16,16h384c8.832,0,16-7.168,16-16v-160C416,311.173,408.832,304.005,400,304.005z" />
    <path d="M506.528,131.973l-128-112c-4.704-4.16-11.424-5.152-17.152-2.528C355.68,20.037,352,25.733,352,32.005v48h-9.472    c-102.848,0-191.36,76.768-205.92,178.592l-8.448,59.168c-1.056,7.456,3.232,14.688,10.368,17.28    c1.792,0.64,3.648,0.96,5.472,0.96c5.376,0,10.592-2.72,13.568-7.52l23.584-37.76c32.384-51.776,88.192-82.72,149.28-82.72H352v48    c0,6.272,3.68,11.968,9.376,14.56c5.664,2.592,12.416,1.632,17.152-2.528l128-112c3.488-3.04,5.472-7.392,5.472-12.032    S510.016,135.013,506.528,131.973z M384,220.741v-28.736c0-8.832-7.168-16-16-16h-37.568c-62.72,0-120.736,27.584-159.968,74.976    c17.28-80.032,89.184-138.976,172.064-138.976H368c8.832,0,16-7.168,16-16V67.269l87.712,76.736L384,220.741z" />
  </svg>
);

export default ({ addSng, addZip }) => (
  <Layout>
    <FileInputButton accept=".zip" onChange={addZip}>
      <AddFileIcon
        extension="zip"
        title="Import zip file from ChurchTools..."
      />
    </FileInputButton>

    <FileInputButton accept=".sng" onChange={addSng}>
      <AddFileIcon extension="sng" title="Add sng file to set..." />
    </FileInputButton>

    <div style={{ cursor: "pointer" }}>
      <ExportIcon />
    </div>
  </Layout>
);
