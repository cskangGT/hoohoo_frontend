import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Switch } from "react-native";
import styled from 'styled-components';
//this component could be reusable for any case that text in a box `has onPress event.

//The below three components are for Save and Edit buttons.
//This button styles can be used in any other purposes.
const StyledModifyContainer = styled(View)`
    top: 15%;
    border-width: 1;
    border-color: grey;
    `
const StyledModifyButton = styled(TouchableOpacity)`
    border-width: 1;
    border-color: white;
    background-color: pink;
    padding: 10px;
    width:80px;
    justify-content: center;
    align-items: center;
    `
const StyledModifyText = styled(Text)`
    color: white;
    `

function ModifyContainer(props: any): JSX.Element {
    return (
        <StyledModifyContainer >
            <StyledModifyButton
                onPress={props.func}>
                <StyledModifyText>
                    {props.text}
                </StyledModifyText>
            </StyledModifyButton>
        </StyledModifyContainer>
    )
}

export default ModifyContainer