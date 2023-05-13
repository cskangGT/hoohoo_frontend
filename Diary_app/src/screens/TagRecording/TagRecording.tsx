import React, { useEffect, useRef, useState } from 'react'

import { View, Text, TouchableHighlight, TextInput, Keyboard, Animated, Dimensions, Image,ImageBackground, SafeAreaView } from "react-native";
import styled from 'styled-components';
import msg from '../../data/msg.json';
import WordContainer from './Containers/WordContainer';
import UserTextInput from './Containers/UserTextInput';
import RecordingButton from './RecordingButton';
import CustomButton from '../../components/common/Button';
import ImageButton from '../../components/common/ImageButton';
// import ImageBackground from '../../components/common/ImageBackground';
const Xbutton = require('../../assets/remove.png');
const Background = require('../../assets/tagRecordingBg.png');
const tb = require('../../assets/circleButton.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Container = styled(ImageBackground)`
    width : 100% ;
    height: 100% ;

`;
const ButtonContainer = styled(View)`
    top:2%;
    /* position: absolute;
    margin-left:70%;
    margin-right:5%; */
    align-items: flex-end;
    
    width:100%;
    
`;
const TagContainers = styled(View)`
    /* position: absolute;
    top:18%; */
    top:3%;
    width: 100%;
    border-width: 2px;
    border-color: violet;
    height:37%;
    
`;
const InputTextContainer = styled(View)`
    /* margin-top: 90%; */
    
    /* position: absolute; */
    width:100%;
    
    height:auto;
    /* border-color: blue;
    border-width: 2px; */
`;
const SwitchContainer = styled(View)`
    /* top: 110%; */
    top:20%;
    margin-left: 5%;
    /* position: absolute; */
    border-width: 2px;
    border-color: red;
`;
const RecordingContainer = styled(View)`
    /* border-width: 1px; */
    width:100%;
    top: ${windowHeight * 0.05}px;
     /* border-width: 2px;
    border-color: red; */
    /* top: 1000%; */
    /* top:2000%; */
    /* position: absolute; */
`;
const MicContainer = styled(View)`
  /* top: 70%; 
  position: absolute; */
  border-width: 2px;
    border-color: green;
    top:10%;
  width: 100%;
`;
const Transition = styled(ImageButton)`
    
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
  background-color: rgb(119, 119, 114);
  opacity: 0.75;
  margin: 5px;
`;

const InsideTagView = styled(View)`
  flex-direction: row;
  align-items: center;
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
const WordView = styled(View)`
  width: 100%;
  /* position: absolute; */
    /* top: 43%; */
    top:5%;
`;

const tags_group = ["Determine", "ItIsPossible", "HardTimes", "ListenToMyVoice", "NeverGiveUp"]

function TagRecording({ navigation, route }: any): JSX.Element {
    function ModeContentContainer(props: any): JSX.Element {
        return (
            <WordView >
                {props.content}
            </WordView>)
    }
    // tags
    const [inputs, setInputs] = useState<string[]>([])
    // 
    const [InputContentHolder, setInputContentHolder] = useState<JSX.Element[]>()
    const [recordedInputs, setRecordedInputs] = useState<string[]>(tags_group)
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [size, setSize] = useState<number>(tags_group.length)
    const [isEditable, setIsEditable] = useState<boolean>(false);
    
    const [animation, setAnimation] = useState<boolean>(false);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
        }).start();
    }, []);
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
        // const renderItem = ({ item, index }: any) => (
        //     <StyledTagWord>
        //         <InsideTagView>
        //             <RemoveButton onPress={() => DeleteContent(index, words, setWords, setWordContent, curr_size)}
        //                 activeOpacity={0.8}
        //                 underlayColor='transparent'>
        //                 <RemoveTagImage source={Xbutton} />
        //             </RemoveButton>
        //             <TagText>{item}</TagText>
        //         </InsideTagView>
        //     </StyledTagWord>
        // );
        let contentHolder = (

            words.map((word: string, index: number) => (
                <View key={"View" + index}>
                    <StyledTagWord key={"View2" + index}>
                        <InsideTagView key={"View3" + index}>
                            <RemoveButton key={"button" + index}
                                onPress={() => {
                                    DeleteContent(index, words, setWords, setWordContent, curr_size)
                                }}
                                activeOpacity={0.8}
                                underlayColor='transparent'>
                                <RemoveTagImage key={"img" + index} source={Xbutton} />
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
                                }}> X </Text>
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
                {/* <SwitchContainer>
                     <Text>
                        Record mode
                    </Text> 
                    <Switch
                        onValueChange={props.switchMode}
                        value={props.currTypeButton === "Type Mode" ? true : false}
                    />
                </SwitchContainer> */}
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
        <SafeAreaView style={{backgroundColor:'black'}}>
        <Container source={Background}>
            <Animated.View style={{opacity: fadeAnim}}>
            <ButtonContainer>
                <CustomButton title="Save" onPress={() => {
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
                
                <MicContainer>
                    {/* <View style={{}}>
                        <WordContainer content={InputContentHolder as JSX.Element[]} ></WordContainer>
                    </View> */}
                    <RecordingContainer>
                        <RecordingButton addInputs={addInputs}></RecordingButton>
                    </RecordingContainer>
                    <Transition src={tb} onPress={()=>{}} 
                    imageStyle={{marginTop: windowHeight * 0.15,
                    alignSelf: 'center'}}/>
                </MicContainer>

            )

            
            }

            {/* {
                currTypeButton === "Speech Mode" &&
                <View style={{ width: '100%', top: '15%', position: 'absolute' }}>
                    <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
                </View>
            } */}
    </Animated.View>
        </Container >
        </SafeAreaView>
    )
}

export default TagRecording

