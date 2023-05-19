import React, { useEffect, useRef, useState } from 'react'

import { Animated, KeyboardAvoidingView, } from "react-native";
import msg from '../../data/msg.json';
import WordContainer from './Containers/WordContainer';
import UserTextInput from './Containers/UserTextInput';
import RecordingButton from './RecordingButton';
import {
    ButtonContainer, Container,
    MicContainer, MicContainerContainer, NavButton, OpacityView, RemoveButton,
    RemoveTagImage, SafeArea, ScrollableView, TagComponent, TagContainers,
    TagText, Transition, TransparentView, WordView, contentContainer, flexOne, whiteFont
} from './styles';
import FadeInFadeOutComponent from './Containers/FadeInFadeOutComponent';

// import ImageBackground from '../../components/common/ImageBackground';
const Xbutton = require('../../assets/remove.png');
const Background = require('../../assets/tagRecordingBg.png');
const WaterSpread1 = require('../../assets/WaterSpread1.png')
const WaterSpread2 = require('../../assets/WaterSpread2.png')

const tags_group = ["Determine", "ItIsPossible",
    "ListenToMyVoice", "NeverGiveUp", "LetItGo", "CantTakeMyEyesOffYou"]

function TagRecording({ navigation, route }: any): JSX.Element {
    // tags
    const [inputs, setInputs] = useState<string[]>([])
    const [recordedInputs, setRecordedInputs] = useState<string[]>(tags_group)
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const DeleteContent = (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        delete words[index];
        setWords(words);
        createContent(words, setWords, setWordContent, isEditable);
    }
    //create tags on the modecontents?
    const createContent = (words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, editable?: boolean) => {
        let contentHolder = (
            words.map((word: string, index: number) => (
                <TagComponent key={"View1" + index}>
                    <RemoveButton key={"button" + index}
                        onPress={() => {
                            DeleteContent(index, words, setWords, setWordContent)
                        }}
                        activeOpacity={0.8}
                        underlayColor='transparent'>
                        <RemoveTagImage key={"img" + index} source={Xbutton} />
                    </RemoveButton>
                    <TagText key={index + word}>
                        {word}
                    </TagText>
                </TagComponent>
            )))
        setWordContent(contentHolder)
    }
    const recordTags = (deleted: string) => {
        recordedInputs.push(deleted)
        setRecordedInputs(recordedInputs)
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable)
    }
    //User speech to text 
    const addInputs = (word: string) => {
        if (word.length == 0) {
            return;
        }
        inputs.push(word)
        while (inputs.length > 0) {
            let deleted = inputs.shift()
            if (deleted !== undefined) {
                recordTags(deleted)
            }
        }
        setInputs(inputs)
    }
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeInAndOutAnim = useRef(new Animated.Value(0)).current;
    const fadeInAndOutAnim2 = useRef(new Animated.Value(0)).current;
    //initially enter to text mode.
    const [isTextMode, setIsTextMode] = useState<boolean>(true)
    const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true)
    //fade in fade out the textinput and other buttons when mode changed
    useEffect(() => {
        if (isFirstVisit) {
            Animated.timing(fadeAnim, { //fade in 
                toValue: 1,
                duration: 1000,
                delay: 0,
                useNativeDriver: true,
            }).start(() => {
                setIsFirstVisit(false)
            })
        } else {
            Animated.timing(fadeAnim, { //fade out 
                toValue: 0,
                duration: 1000,
                delay: 0,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(fadeAnim, {//fade in
                    toValue: 1,
                    duration: 1500,
                    delay: 2000,
                    useNativeDriver: true,
                }).start()
            });
        }
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable)
    }, [fadeAnim, isTextMode]);

    //executed when the mode change button clicked
    function fadeInFadeOut() {
        fadeAnim.setValue(1);
        if (!isTextMode) {
            fadeInAndOutAnim.setValue(1);
            fadeInAndOutAnim2.setValue(1);
        } else {
            fadeInAndOutAnim.setValue(0);
            fadeInAndOutAnim2.setValue(0);
        }
    }

    //used to determine whether display the mode change button or not 
    const [isTyping, setIsTyping] = useState<boolean>(false);
    return (
        <Container source={Background}>
            <SafeArea>
                <TransparentView>
                    <OpacityView>
                        <FadeInFadeOutComponent
                            source={WaterSpread1}
                            fadeInAndOutAnim={fadeInAndOutAnim}
                            duration={1000}
                            delay={(isTextMode) ? 2500 : 0}
                            isTextMode={isTextMode}
                            height='80%'
                            top='20%'
                            left='-20%'
                        />
                    </OpacityView >
                    <OpacityView>
                        <FadeInFadeOutComponent
                            source={WaterSpread2}
                            fadeInAndOutAnim={fadeInAndOutAnim2}
                            duration={3000}
                            delay={(isTextMode) ? 500 : 2500}
                            isTextMode={isTextMode}
                            height='80%'
                            top='10%'
                            left='40%'
                        />
                    </OpacityView>
                </TransparentView>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        flex: 1,
                    }}>
                    <ScrollableView contentContainerStyle={contentContainer}>
                        <KeyboardAvoidingView style={flexOne}>
                            <ButtonContainer>
                                <NavButton
                                    title="List" onPress={() => {
                                        navigation.navigate('ListView')
                                    }}
                                    textStyle={whiteFont} />
                                <NavButton title="Save" onPress={() => {
                                    navigation.navigate('Diary')
                                }}
                                    textStyle={whiteFont} />
                            </ButtonContainer>
                            <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>
                            <UserTextInput
                                addInputs={addInputs}
                                setIsTyping={setIsTyping}
                            />
                        </KeyboardAvoidingView>
                        {
                            !isTyping &&
                            <MicContainerContainer>
                                <RecordingButton
                                    fadeInFadeOut={fadeInFadeOut}
                                    isTextMode={isTextMode}
                                    setIsTextMode={setIsTextMode}
                                    addInputs={addInputs} />
                            </MicContainerContainer>
                        }
                    </ScrollableView>
                </Animated.View>
            </SafeArea>
        </Container>
    )
}
export default TagRecording
