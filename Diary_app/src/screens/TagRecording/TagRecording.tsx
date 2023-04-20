import React, { useEffect, useRef, useState } from 'react'

import { FlatList, View, Text, TouchableHighlight, TextInput, TouchableOpacity, Keyboard, Switch, Dimensions, Image } from "react-native";
import styled from 'styled-components';
import msg from '../../data/msg.json';
import WordContainer from './Containers/WordContainer';
import UserTextInput from './Containers/UserTextInput';
// import * as speech from './speechUtils';
import RecordingButton from './RecordingButton';
import CustomButton from '../../components/common/Button';
import ImageBackground from '../../components/common/ImageBackground';
const Xbutton = require('../../assets/remove.png');


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled(ImageBackground)`
    width : 100% ;
    height: 100% ;
`;
const ButtonContainer = styled(View)`
    top:5%;
    position: absolute;
    width:100%;
    margin-left:70%;
    margin-right:5%;
    border-width: 2px;
    
`;
const TagContainers = styled(View)`
    position: absolute;
    top:18%;
    width: 100%;
    /* border-width: 2px;
    border-color: violet; */
    height:25%;
    
`;
const InputTextContainer = styled(View)`
    /* margin-top: 90%; */
    top:50%;
    position: absolute;
    width:100%;
    /* border-width: 2px; */
    height:auto;
    /* border-color: blue; */
    
`;
const SwitchContainer = styled(View)`
    /* top: 110%; */
    top:30%;
    margin-left: 5%;
    /* position: absolute; */
    /* border-width: 2px;
    border-color: red; */
`;
const RecordingContainer = styled(View)`
    /* border-width: 1px; */
    width:100%;
    
    /* top: 1000%; */
    /* top:2000%; */
    position: absolute;
`;

// const StyledTagWord = styled(View)`
//     border-width: 1px;
//     border-color: gray;
//     border-radius: 50px;
//     padding: 5px;
//     background-color: rgb(71, 71, 70);
//     opacity:1;
//     margin: 5px;
// `;
// const InsideTagView = styled(View)`
//     flex-direction: row;
// `;
// const RemoveTagImage = styled(Image)`
//     width:15px;
//     height:15px;
//     padding-right: 5px;
// `;
const StyledTagWord = styled(View)`
  border-width: 1px;
  border-color: gray;
  border-radius: 50px;
  padding: 5px;
  background-color: rgb(71, 71, 70);
  opacity: 1;
  margin-vertical: 5px; /* 수정: margin 속성을 marginVertical과 marginHorizontal로 분리 */
  margin-horizontal: 5px;
`;

const InsideTagView = styled(View)`
  flex-direction: row;
`;

const RemoveTagImage = styled(Image)`
  width: 15px;
  height: 15px;
  padding-right: 5px;
`;

const TagText = styled(Text)`
    color: white;
`;
const RemoveButton = styled(TouchableHighlight)`
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;


function TagRecording({ navigation, route }: any): JSX.Element {

    function ModeContentContainer(props: any): JSX.Element {
        return (
            <View style={{ width: '100%', position: 'absolute', top: '43 %' }}>
                {props.content}
            </View>)
    }
    // tags
    const [inputs, setInputs] = useState<string[]>([])
    // 
    const [InputContentHolder, setInputContentHolder] = useState<JSX.Element[]>()
    const [recordedInputs, setRecordedInputs] = useState<string[]>([])
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [size, setSize] = useState<number>(0)
    const [isEditable, setIsEditable] = useState<boolean>(false);

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



    //create tags on the modecontents?
    const createContent = (words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, editable?: boolean, curr_size?: number) => {
        const renderItem = ({ item, index }: any) => (
            <StyledTagWord>
                <InsideTagView>
                    <RemoveButton onPress={() => DeleteContent(index, words, setWords, setWordContent, curr_size)}>
                        <RemoveTagImage source={Xbutton} />
                    </RemoveButton>
                    <TagText>{item}</TagText>
                </InsideTagView>
            </StyledTagWord>
        );
        let contentHolder = (

            words.map((word: string, index: number) => (
                <View>
                    <StyledTagWord >
                        <InsideTagView>
                            <RemoveButton
                                onPress={() => {
                                    DeleteContent(index, words, setWords, setWordContent, curr_size)
                                }}>
                                <RemoveTagImage source={Xbutton} />
                            </RemoveButton>
                            <TagText key={index + word}>
                                {word}
                            </TagText>
                        </InsideTagView>

                        {/* {(editable) && //add X button on the top right, when recording or edit button is pressed
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
                            onPress={() => }
                        >
                            <Text key={index + "del_bt_x"}
                                style={{
                                    color: 'white',
                                }}>X</Text>
                        </TouchableOpacity>
                    } */}
                    </StyledTagWord>
                </View>
            )))



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

        let time = 3000;
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
            <InputTextContainer>
                <UserTextInput
                    textInput={props.textInput} onChangeText={props.onChangeText} recordTags={props.recordTags}
                    setTextInput={props.setTextInput} currTypeButton={props.currTypeButton} switchMode={props.switchMode}
                    focusOnInput={props.focusOnInput}
                    size={props.size}
                ></UserTextInput>
                <SwitchContainer>
                    {/* <Text>
                        Record mode
                    </Text> */}
                    <Switch
                        onValueChange={props.switchMode}
                        value={props.currTypeButton === "Type Mode" ? true : false}
                    />
                </SwitchContainer>
            </InputTextContainer>
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
        );
        setModeContent(ModeContentHolder)
    }
    return (
        <Container>
            <ButtonContainer>
                <CustomButton title="See Tags" onPress={() => {
                    navigation.navigate('Diary')
                }} style={{ padding: 10 }} textStyle={{ color: 'white', fontSize: 17 }} />
                {/* 
                <CustomButton title={isEditable ? "Cancel" : "Edit"} onPress={() => {
                    setIsEditable(!isEditable)
                }} textStyle={{ color: 'white' }} /> */}

            </ButtonContainer>
            <TagContainers>
                <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>
            </TagContainers>
            <ModeContentContainer content={modeContent as JSX.Element} />

            {/* The speech mode has Type mode button, text input for cursor blinking only, and record button at the bottom. */}

            {currTypeButton === "Type Mode" && (
                <View style={{ top: '70%', position: 'absolute', width: '100 %' }}>
                    {/* <View style={{}}>
                        <WordContainer content={InputContentHolder as JSX.Element[]} ></WordContainer>
                    </View> */}
                    <RecordingContainer style={{ top: windowHeight * 0.1 }}>
                        <RecordingButton addInputs={addInputs}></RecordingButton>
                    </RecordingContainer>
                </View>
            )}

            {/* {
                currTypeButton === "Speech Mode" &&
                <View style={{ width: '100%', top: '15%', position: 'absolute' }}>
                    <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
                </View>
            } */}

        </Container >
    )
}

export default TagRecording

