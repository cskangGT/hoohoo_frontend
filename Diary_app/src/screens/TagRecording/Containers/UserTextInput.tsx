import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Switch } from "react-native";
import styled from 'styled-components';

//this component could be reusable if further modified. ex) modify fontSize, autoFocus etc..
//could be usuable in search bar, quote typing, etc..

//contains user type input. 
function UserTextInput(props: any): JSX.Element {
    const [typeText, setTypeText] = useState<string>()
    //focus if current mode is type mode which contains Speech Mode button
    let focus = (props.currTypeButton === "Speech Mode")
    return (
        <TextInput
            style={{fontSize:44, height: 100, width: '100%', borderWidth: 1, padding: 10 }}
            onFocus={() => {
                if (props.currTypeButton === "Type Mode") {
                    props.switchMode()
                }
            }
            }
            pointerEvents="none"
            ref={props.focusOnInput}
            onChangeText={(text: string) => {
                // props.onChangeText(text)
                setTypeText(text)
            }
                }
            value={typeText}
            
            autoFocus={focus}
            blurOnSubmit={false} //disable dismissing keyboard panel automatically!
            onSubmitEditing={() => {
                props.recordTags(typeText); //reuse previosuly made function for STT input!
                setTypeText("")
                // props.setTextInput("");
            }} />
    );
}
export default UserTextInput