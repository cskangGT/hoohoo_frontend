import React, { useState } from 'react'
import {TextInput} from "react-native";
import styled from 'styled-components';

//this component could be reusable if further modified. ex) modify fontSize, autoFocus etc..
//could be usuable in search bar, quote typing, etc..
const InputText = styled(TextInput)`
  align-self: center;
  /* justify-content: center; */
  font-size: 60px;
  padding: 5px;
  border-bottom-color: white;
  border-bottom-width: 2px;
  width: 80%;
  color: white;
`;
//contains user type input. 
function UserTextInput(props: any): JSX.Element {
    const [typeText, setTypeText] = useState<string>()
    //focus if current mode is type mode which contains Speech Mode button
    let focus = (props.currTypeButton === "Speech Mode")
    return (
        <InputText
            //when the textinput is touched, automatically switch to Type mode!
            onFocus={() => {
                if (props.currTypeButton === "Type Mode") {
                    props.switchMode()
                }
            }}
            autoCapitalize='sentences'
            autoCorrect={false}
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
                props.recordTags(typeText, props.size); //reuse previosuly made function for STT input!
                setTypeText("")
                props.setTextInput("");
            }} />
    );
}
export default UserTextInput