import React from "react";
import styled from "styled-components";

const Header = styled.text`
  fill: white;
  text-shadow: 1px 1px 1px black, 1px -1px 1px black, -1px 1px 1px black,
    -1px -1px 1px black;
  font: bold 32px sans-serif;
`;

const Body = styled.text`
  fill: white;
  text-shadow: 1px 1px 1px black, 1px -1px 1px black, -1px 1px 1px black,
    -1px -1px 1px black;
  font: bold 40px sans-serif;
`;

export default ({ header, body, footer }) => {
  return (
    <svg
      viewBox={`0 0 ${window.screen.width} ${window.screen.height}`}
      width="100%"
      height="100%"
      style={{ background: "#ccc" }}
    >
      <Header x="50%" y="1.25em" textAnchor="middle">
        {header}
      </Header>
      <Body x="50%" y="50%" textAnchor="middle">
        {body}
      </Body>
    </svg>
  );
};
