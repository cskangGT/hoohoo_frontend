import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard, Switch } from "react-native";
import styled from 'styled-components';
// import styles from '.././styles'
import msg from '../../data/msg.json'
import ModifyContainer from './Containers/ModifyContainer'
import WordContainer from './Containers/WordContainer'
import UserTextInput from './Containers/UserTextInput';

function ModeContentComponents(props: any): JSX.Element {
    return (
        <View style={{ width: '100%' }}>
            <UserTextInput
                textInput={props.textInput} onChangeText={props.onChangeText} recordTags={props.recordTags}
                setTextInput={props.setTextInput} currTypeButton={props.currTypeButton} switchMode={props.switchMode}
                focusOnInput={props.focusOnInput}
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
                    // trackColor={{ false: '#767577', true: '#81b0ff' }}
                    // thumbColor={props.currTypeButton ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={props.switchMode}
                    value={props.currTypeButton === "Type Mode" ? true : false}
                />
            </View>
        </View>
    )
}
function ModeContentContainer(props: any): JSX.Element {
    return (
        <View style={{ width: '100%' }}>
            {props.content}
        </View>)
}
function TagRecording(): JSX.Element {


    const [inputs, setInputs] = useState<string[]>([])
    const [InputContentHolder, setInputContentHolder] = useState<JSX.Element[]>()
    const [recordedInputs, setRecordedInputs] = useState<string[]>([])
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()

    const DeleteContent = (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        delete words[index]
        setWords(words)
        createContent(words, setWords, setWordContent)
    }
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const createContent = (words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        let contentHolder = (
            words.map((word: string, index: number) => (
                <View style={{ backgroundColor: 'transparent' }}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'orange',
                            borderRadius: 50,
                            padding: 10,
                            backgroundColor: 'transparent',
                            margin: 5
                        }}
                        key={index}
                    >
                        <Text key={index + "th_user_input_text"}
                            style={{ color: 'black' }}>{word}</Text>
                    </TouchableOpacity>
                    {isEditable &&
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
                            onPress={() => DeleteContent(index, words, setWords, setWordContent)}
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

    const recordTags = (deleted: string) => {
        recordedInputs.push(deleted)
        setRecordedInputs(recordedInputs)
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder)
    }
    const generateUserInputs = () => {
        let message = msg.message
        message.forEach((word: string, index: number) => {
            addInputs(word)
        })
    }
    const addInputs = (word: string) => {
        inputs.push(word)
        setInputs(inputs)
        createContent(inputs, setInputs, setInputContentHolder)

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
            focusOnInput.current?.focus();
            setCurrTypeButton("Speech Mode")
        } else {
            setCurrTypeButton("Type Mode")
            Keyboard.dismiss()
        }
    }

    //when type button is toggled, (actually for now on, it is 'switch', not a button)
    //update the mode content appropriately either from speech to type or from type to speech.
    useEffect(() => {
        updateModeConent()
        
    }, [currTypeButton])
    //when editable is changed, display/hide (x) button(s) on each tags
    useEffect(() => {
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder)
        createContent(inputs, setInputs, setInputContentHolder)
        
    }, [isEditable])

    
    const [modeContent, setModeContent] = useState<JSX.Element>(
        <ModeContentComponents
            textInput={textInput}
            onChangeText={onChangeText}
            recordTags={recordTags}
            setTextInput={setTextInput}
            currTypeButton={currTypeButton}
            switchMode={switchMode}
            focusOnInput={focusOnInput}
        />
    )
    //update mode content with updated state values.
    const updateModeConent = () => {
        let ModeContentHolder = (
            <ModeContentComponents
                textInput={textInput}
                onChangeText={onChangeText}
                recordTags={recordTags}
                setTextInput={setTextInput}
                currTypeButton={currTypeButton}
                switchMode={switchMode}
                focusOnInput={focusOnInput}
            />
        )
        setModeContent(ModeContentHolder)
    }
    return (
        <View style={{ alignItems: 'center', backgroundColor: 'yellow' }}>
            <ModifyContainer func={() => {
             }} text="Save" />
            <ModifyContainer func={() => { 
                setIsEditable(!isEditable)
                }} text={isEditable ? "Cancel":"Edit"} />

            <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>

            <ModeContentContainer content={modeContent as JSX.Element} />

            {/* The speech mode has Type mode button, text input for cursor blinking only, and record button at the bottom. */}

            {currTypeButton === "Type Mode" &&
                <View style={{ width: '100%' }}>

                    {/* operate STT  */}
                    <Button
                        title="Record"
                        onPress={() => {
                            generateUserInputs()
                            //below code doesn't work!
                            // recorder
                            //     .record({
                            //         sampleRateHertz: sampleRateHertz,
                            //         threshold: 0.07,
                            //         // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
                            //         verbose: false,
                            //         recordProgram: 'rec', // Try also "arecord" or "sox"
                            //         silence: '10.0',
                            //     })
                            //     .stream()
                            //     .on('error', console.error)
                            //     .pipe(recognizeStream);
                        }} />
                </View>
            }

            <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
        </View>
    )
}

export default TagRecording

