import React from "react";
import styled from "styled-components";

const NoDisplayInput = styled.input`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Button = styled.label`
  cursor: pointer;
`;

export default ({ accept, children, onChange }) => (
  <>
    <Button>
      <NoDisplayInput
        type="file"
        accept={accept}
        onChange={onChange}
        multiple
      />
      {children}
    </Button>
  </>
);
