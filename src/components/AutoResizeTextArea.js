import React from 'react';
import styled from 'styled-components';

import TextareaAutosize from 'react-textarea-autosize';

const StyledTextareaAutosize = styled(TextareaAutosize)`
outline: none;  
background-color: black;
color: ${prop => prop.completed ? '#555555' : 'lightgray'};
border: none;
&:focus {
  border: none;
  border-bottom: 2px solid gray;
}
`;

export default function AutoResizeTextArea(props) {
	return <StyledTextareaAutosize {...props} />;
  }