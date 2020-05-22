import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  grid-area: header;
  display: flex;
  justify-content: center;
  background: #444;
  padding: 5px;
  color: #ccc;
  font-size: 0.8rem;
  font-weight: 700;
`;

export default ({ title }) => <Layout>{title}</Layout>;
