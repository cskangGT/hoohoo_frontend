import React, { useRef, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData, TouchableWithoutFeedback, View } from "react-native";
import styled from 'styled-components';
import { InputText, InputTextContainer } from '../styles';

//this component could be reusable if further modified. ex) modify fontSize, autoFocus etc..
//could be usuable in search bar, quote typing, etc..

//contains user type input. 
//props contains..
//checkRegulation: if pass regulation, add current text to recorded tags.
function UserTextInput(props: any): JSX.Element {
    const [textInput, setTextInput] = useState<string>("")

    //focus if current mode is type mode which contains Speech Mode button
    // let focus = (props.currTypeButton === "Speech Mode")
    const textInputRef = useRef<TextInput>(null);

    const handleOutsideTouch = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };
    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
            <InputTextContainer>
                <InputText
                    ref={textInputRef}
                    value={textInput}
                    onChangeText={(t: string) => {
                        setTextInput(t);
                    }}
                    blurOnSubmit={false}
                    onSubmitEditing={(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                        
                        props.checkRegulation(event.nativeEvent.text)
                        setTextInput("");
                    }}
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    placeholder='Hello'
                    placeholderTextColor="#CCCCCC"
                    onFocus={() => {
                        props.setIsTyping(true);
                    }}
                    onBlur={()=>{props.setIsTyping(false);
                    }}
                />
            </InputTextContainer>
        </TouchableWithoutFeedback>
    );
}
export default UserTextInput
 // <InputText
        //     //when the textinput is touched, automatically switch to Type mode!
        //     onFocus={() => {
        //         if (props.currTypeButton === "Type Mode") {
        //             props.switchMode()
        //         }
        //     }}
        //     autoCapitalize='sentences'
        //     autoCorrect={false}
        //     pointerEvents="none"
        //     ref={props.focusOnInput}
        //     onChangeText={(text: string) => {
        //         // props.onChangeText(text)
        //         setTypeText(text)
        //     }
        //     }
        //     value={typeText}
        //     // autoFocus={focus}
        //     blurOnSubmit={false} //disable dismissing keyboard panel automatically!
        //     onSubmitEditing={() => {
        //         props.recordTags(typeText, props.size); //reuse previosuly made function for STT input!
        //         setTypeText("")
        //         props.setTextInput("");
        //     }} />