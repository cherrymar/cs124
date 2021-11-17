import React, {useState} from 'react';
import styled from 'styled-components';

import IconButton from '@mui/material/IconButton';


const Container = styled.div`

`


export default function MenuItem(props) {



    return(
        <>
            <Container>
                <IconButton aria-label={props.label} size="small" onClick={() => props.onClick} sx={{padding: 0}}>
                    {props.children}
                </IconButton> 
            </Container>
        </>

    )
}