import { useEffect, useRef, useState } from "react";
import React from "react";
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
//props contains..
/**
 * index: index of current diary at the json
 * setIsTyping: share if currently keyboard is up or not
 * currSize: number of currently added attached data 
 */
function TextInputContainer(props: any): JSX.Element {
    const [text, setText] = useState<string>(props.value)
    useEffect(() => {
        setText(props.value)
    }, [props.value])
    //use to blur when its complement is pressed.
    const inputRef = useRef<TextInput>(null);
    const removeFocus = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };
    return (
        <TouchableWithoutFeedback onPress={removeFocus}>
            <TouchableOpacity
                style={{
                    padding: '2.5%',
                    width: '100%',
                    alignSelf: 'flex-start',
                    zIndex: 0
                }}
                onLongPress={() => { props.setDeletable(true); }}
                onPress={() => {
                    inputRef.current?.focus();
                }}>
                <TextInput
                    value={text}
                    ref={inputRef}
                    multiline={true}
                    style={{ color: 'white', }}
                    placeholder='Add Note'
                    placeholderTextColor={'gray'}
                    onFocus={() => { props.setIsTyping(true) }}
                    onChangeText={(t) => { setText(t) }}
                    onBlur={() => {
                        props.setIsTyping(false);
                        //save current note to the related json data
                        props.attach[props.noteIndex] = text
                    }}
                />
            </TouchableOpacity>
        </TouchableWithoutFeedback >
    )
}
export default TextInputContainer