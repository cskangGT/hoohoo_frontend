import { useEffect, useRef, useState } from "react";
import data from '../../../data/data.json'
import Icon from 'react-native-paper/src/components/Icon'
import { IndividualTagContainer, RemoveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, VerticalList } from "../styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleProp, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
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
                    // borderColor: 'red',
                    // borderWidth: 1,
                    padding: '2.5%',
                    width: '100%',
                    alignSelf: 'flex-start',
                    zIndex: 0
                }}
                onLongPress={() => { props.setDeletable(true); }}
                onPress={() => {
                    inputRef.current?.focus();
                }}
            >
                <TextInput
                    value={text}
                    ref={inputRef}
                    multiline={true}
                    style={{ color: 'white', }}
                    placeholder='Add Note'
                    placeholderTextColor={'white'}
                    onFocus={() => { props.setIsTyping(true) }}
                    onChangeText={(t) => { setText(t) }}
                    onBlur={() => {
                        props.setIsTyping(false);
                        //save current note to the related json data
                        // if (props.attach[props.noteIndex]!==undefined) {
                        props.attach[props.noteIndex] = text
                        // props.setAttach(props.attach)
                        // } else {
                        //     props.attach.push(text)
                        // }
                    }}
                />
            </TouchableOpacity>
        </TouchableWithoutFeedback >
    )
}
export default TextInputContainer

//tried working with a json file.
// import { useEffect, useRef, useState } from "react";
// import data from '../../../data/data.json'
// import Icon from 'react-native-paper/src/components/Icon'
// import { IndividualTagContainer, RemoveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, VerticalList } from "../styles";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { StyleProp, TextInput, TextStyle, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
// //props contains..
// /**
//  * index: index of current diary at the json
//  * setIsTyping: share if currently keyboard is up or not
//  * currSize: number of currently added attached data
//  */
// function TextInputContainer(props: any): JSX.Element {
//     const [text, setText] = useState<string>(props.value)
//     useEffect(() => {
//         setText(props.value)
//     }, [props.value])
//     //use to blur when its complement is pressed.
//     const inputRef = useRef<TextInput>(null);
//     const removeFocus = () => {
//         if (inputRef.current) {
//             inputRef.current.blur();
//         }
//     };
//     return (
//         <TouchableWithoutFeedback onPress={removeFocus}>
//             <TouchableOpacity
//                 style={{
//                     // borderColor: 'red',
//                     // borderWidth: 1,
//                     padding: '2.5%',
//                     width: '100%',
//                     alignSelf: 'flex-start',
//                     zIndex: 0
//                 }}
//                 onLongPress={() => { props.setDeletable(true); }}
//                 onPress={() => {
//                     inputRef.current?.focus();
//                 }}
//             >
//                 <TextInput
//                     value={text}
//                     ref={inputRef}
//                     multiline={true}
//                     style={{ color: 'white', }}
//                     placeholder='Add Note'
//                     placeholderTextColor={'white'}
//                     onFocus={() => { props.setIsTyping(true) }}
//                     onChangeText={(t) => { setText(t) }}
//                     onBlur={() => {
//                         props.setIsTyping(false);
//                         //save current note to the related json data
//                         if (data[props.index].attach[props.noteIndex]) {
//                             data[props.index].attach[props.noteIndex] = text
//                         } else {
//                             data[props.index].attach.push(text)
//                         }
//                     }}
//                 />
//             </TouchableOpacity>
//         </TouchableWithoutFeedback >
//     )
// }
// export default TextInputContainer