import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Switch } from "react-native";
import styled from 'styled-components';

//this component could be reusable to show text in a box.
//contains input tags on recorded & STT area
const StyledButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    `

//tag for user input or recorded ones
function WordContainer(content: any & JSX.Element): JSX.Element {
    return (
        <StyledButtonContainer>
            {
                content.content
            }
        </StyledButtonContainer>
    )
}
export default WordContainer