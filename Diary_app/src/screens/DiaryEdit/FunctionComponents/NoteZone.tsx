import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { TextInput } from 'react-native';
import { showPlusButtonEx } from './FunctionComponents';

const StyledHorizontallyAlignedItems = styled(View)`
flex-direction: row;
 justify-content: center;
 align-items: center;
 flex:1;
 padding-horizontal: 20;
`
const StyledButtonText = styled(Text)`
font-size: 25;
text-align: center;
color: white;
`
const StyledTextInput = styled(TextInput)`
border-radius: 50;
border-color: white;
border-width: 1;
padding: 15px;
color:white;
placeholderTextColor:white;
`
function NoteArea(props: any): JSX.Element {
    return (props.note)
}
export let setWriteDiaryEx: React.Dispatch<React.SetStateAction<boolean>>;
export let writeDiaryEx: boolean
function NoteZone(): JSX.Element {

    const [writeDiary, setWriteDiary] = useState<boolean>(false)
    setWriteDiaryEx = setWriteDiary
    writeDiaryEx = writeDiary
    const [text, setText] = useState<string>()
    const textinputref = useRef<TextInput>(null)
    if (writeDiary) {
        textinputref.current?.focus()
    }
    const [note, setNote] = useState<JSX.Element>(<StyledTextInput
        ref={textinputref}
        placeholder='Write a note'
        value={text}
        multiline={true}
        onChangeText={(text) => { setText(text); }}
        onFocus={()=>{
            setWriteDiary(true)

            showPlusButtonEx(false)
        }}
    />)
    return (
        <View>
            {/* textinput on/off */}
            {/* {writeDiary && */}
            <View>
                <NoteArea
                    note={note}
                />
                <StyledHorizontallyAlignedItems
                    style={{
                        justifyContent: 'flex-end', alignItems: 'flex-end'
                    }}
                >
                    {
                        writeDiary &&
                        <TouchableOpacity onPress={() => { console.log("save the text"); setWriteDiary(false);showPlusButtonEx(true) }}
                            style={{
                                borderColor: '#8FDF70',
                                borderWidth: 1,
                                borderRadius: 50,
                                backgroundColor: '#8FDF70',
                                width: 50
                            }}>
                            {/* save a note */}
                            <StyledButtonText>
                                &#10003;
                            </StyledButtonText>
                        </TouchableOpacity>
                    }


                </StyledHorizontallyAlignedItems>
            </View>
            {/* } */}
        </View >)
}
export default NoteZone

/* <TouchableOpacity onPress={() => { setWriteDiary(false); setText('') }}
                            style={{
                                borderColor: '#FF2511',
                                borderWidth: 1,
                                borderRadius: 50,
                                backgroundColor: '#FF2511',
                                width: 50
                            }}>
                            {/* delete a note     
                            <StyledButtonText>
                                &#65794;
                            </StyledButtonText>
                        </TouchableOpacity> */