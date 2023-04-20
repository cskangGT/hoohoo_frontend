import React, { useEffect, useRef, useState } from 'react'

import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Switch, TouchableHighlight } from "react-native";
import styled from 'styled-components';

import msg from '../../data/msg.json'
import ModifyContainer from './Containers/ModifyContainer'
import WordContainer from './Containers/WordContainer'
import UserTextInput from './Containers/UserTextInput';
// import * as speech from './speechUtils';
import RecordingButton from './RecordingButton'
import styled from 'styled-components';
const StyledTagWord = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: orange;
    border-radius: 50px;
    padding: 10px;
    background-color: transparent;
    margin: 5px;
`;

function TagRecording(): JSX.Element {
    function ModeContentContainer(props: any): JSX.Element {
        return (
            <View style={{ width: '100%' }}>
                {props.content}
            </View>)
    }
    const [inputs, setInputs] = useState<string[]>([])
    const [InputContentHolder, setInputContentHolder] = useState<JSX.Element[]>()
    const [recordedInputs, setRecordedInputs] = useState<string[]>([])
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [size, setSize] = useState<number>(0)
    const DeleteContent = (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, curr_size?: number) => {
        delete words[index];
        setWords(words);
        if (curr_size) {
            setSize(curr_size - 1)
            if (words === recordedInputs) {
                if (curr_size - 1 === 0) {
                    setIsEditable(false);
                }
            }
            createContent(words, setWords, setWordContent, isEditable, curr_size - 1);
        } else {
            createContent(words, setWords, setWordContent, isEditable);
        }
    }
    const [isEditable, setIsEditable] = useState<boolean>(false);

    //create tags on the modecontents?
    const createContent = (words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, editable?: boolean, curr_size?: number) => {
        let contentHolder = (
            words.map((word: string, index: number) => (
                <View  key = {index+"view"} style={{ backgroundColor: 'transparent' }}>
                    <StyledTagWord
                        // style={{
                        //     borderWidth: 1,
                        //     borderColor: 'orange',
                        //     borderRadius: 50,
                        //     padding: 10,
                        //     backgroundColor: 'transparent',
                        //     margin: 5
                        // }}
                        key={index}
                    >
                        <Text key={index + "th_user_input_text"}
                            style={{ color: 'black' }}>{word}</Text>
                    </StyledTagWord>

                    {(editable) && //add X button on the top right, when recording or edit button is pressed
                        <TouchableOpacity
                            key={index + "delete_bt"}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                borderRadius: 25, // half of width and height
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 25,
                                height: 25,
                            }}
                            onPress={() => DeleteContent(index, words, setWords, setWordContent, curr_size)}
                        >
                            <Text key={index + "del_bt_x"}
                                style={{
                                    color: 'white',
                                }}>X</Text>
                        </TouchableOpacity>
                    }
                </View>
            ))
        )
        setWordContent(contentHolder)
    }
    const increaseSize = () => {
        setSize(size + 1)
    }
    const recordTags = (deleted: string) => {
        recordedInputs.push(deleted)
        setRecordedInputs(recordedInputs)
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable, size + 1)
        increaseSize()

    }
    const generateUserInputs = () => {
        let message = msg.message
        message.forEach((word: string, index: number) => {
            addInputs(word)
        })
    }
    //User speech to text 
    const addInputs = (word: string) => {
        inputs.push(word)
        setInputs(inputs)
        createContent(inputs, setInputs, setInputContentHolder, true)

        let time = 3000
        setTimeout(
            () => {
                while (inputs.length > 0) {
                    let deleted = inputs.shift()
                    if (deleted !== undefined) {
                        recordTags(deleted)
                    }
                }
                setInputs(inputs)
                createContent(inputs, setInputs, setInputContentHolder)
            }
            , time)
    }

    //TextMode
    const [textInput, setTextInput] = useState<string>()
    const onChangeText = (text: string) => {
        setTextInput(text)
    }

    //switch mode state
    const [currTypeButton, setCurrTypeButton] = useState<string>("Type Mode")
    const focusOnInput = useRef<TextInput>(null)
    const switchMode = () => {
        if (currTypeButton === "Type Mode") {
            focusOnInput.current?.focus(); //keyboard on
            setCurrTypeButton("Speech Mode")
        } else {
            setCurrTypeButton("Type Mode") //keyboard off
            Keyboard.dismiss()
        }
    }
    //when tags are added to the recored inputs area, re-create components with the updated size.
    useEffect(() => {
        updateModeCotent()
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable, size)
    }, [size])
    //when type button is toggled, (actually for now on, it is 'switch', not a button)
    //update the mode content appropriately either from speech to type or from type to speech.
    useEffect(() => {
        updateModeCotent()

    }, [currTypeButton])
    //when editable is changed, display/hide (x) button(s) on each tags
    useEffect(() => {
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable, size)
        createContent(inputs, setInputs, setInputContentHolder)
    }, [isEditable])

    function ModeContentComponents(props: any): JSX.Element {

        return (
            <View style={{ width: '100%' }}>
                <UserTextInput
                    textInput={props.textInput} onChangeText={props.onChangeText} recordTags={props.recordTags}
                    setTextInput={props.setTextInput} currTypeButton={props.currTypeButton} switchMode={props.switchMode}
                    focusOnInput={props.focusOnInput}
                    size={props.size}
                ></UserTextInput>
                <View style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                }}>
                    <Text>
                        Record mode
                    </Text>
                    <Switch
                        onValueChange={props.switchMode}
                        value={props.currTypeButton === "Type Mode" ? true : false}
                    />
                </View>
            </View>
        )
    }
    //update textinput, switch mode, size of tags etc.
    const [modeContent, setModeContent] = useState<JSX.Element>(
        <ModeContentComponents
            textInput={textInput}
            onChangeText={onChangeText}
            recordTags={recordTags}
            setTextInput={setTextInput}
            currTypeButton={currTypeButton}
            switchMode={switchMode}
            focusOnInput={focusOnInput}
            size={size}
        />
    )
    //update mode content with updated state values.
    const updateModeCotent = () => {
        let ModeContentHolder = (
            <ModeContentComponents
                textInput={textInput}
                onChangeText={onChangeText}
                recordTags={recordTags}
                setTextInput={setTextInput}
                currTypeButton={currTypeButton}
                switchMode={switchMode}
                focusOnInput={focusOnInput}
                size={size}
            />
        )
        setModeContent(ModeContentHolder)
    }
    return (
        <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
            <ModifyContainer func={() => {
            }} text="Save" />
            <ModifyContainer func={() => {
                setIsEditable(!isEditable)
            }} text={isEditable ? "Cancel" : "Edit"} />

            <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>

            <ModeContentContainer content={modeContent as JSX.Element} />

            {/* The speech mode has Type mode button, text input for cursor blinking only, and record button at the bottom. */}

            {currTypeButton === "Type Mode" &&
                <View style={{ width: '100%' }}>

                    <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
                    <RecordingButton addInputs={addInputs}></RecordingButton>


                    {/* operate STT  */}
                    <Button
                        title="Record"
                        onPress={() => {
                            
                        }} /> 

                </View>
            }
            {currTypeButton === "Speech Mode" &&
                <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
            }
        </View>
    )
}

export default TagRecording

