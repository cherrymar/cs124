import React from 'react';
import styled from 'styled-components';

import TextareaAutosize from 'react-textarea-autosize';

const StyledTextAreaAutosize = styled(TextareaAutosize)`
  outline: none;  
  background-color: black;
  color: ${prop => prop.completed === "true" ? '#555555' : 'lightgray'};
  border: none;
  width: 60%;
  &:focus {
    border: none;
    border-bottom: 2px solid gray;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  resize: none;
`;

export default function AutoResizeTextArea(props) {
	return <StyledTextAreaAutosize {...props} />;
  }