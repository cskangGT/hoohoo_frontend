import React, { useEffect, useRef, useState } from 'react'

import { Animated, Text, TouchableOpacity, KeyboardAvoidingView, ToastAndroid, View, } from "react-native";
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
import data from '../../data/data.json'
import Toast from 'react-native-simple-toast';

// import ImageBackground from '../../components/common/ImageBackground';
const Xbutton = require('../../assets/remove.png');
const Background = require('../../assets/tagRecordingBg.png');
const WaterSpread1 = require('../../assets/WaterSpread1.png')
const WaterSpread2 = require('../../assets/WaterSpread2.png')

function TagRecording({ navigation, route }: any): JSX.Element {
    const index = parseInt(route.params.index)
    const tags: string[] = data[index].tags
    // user typed input
    const [inputs, setInputs] = useState<string[]>([])
    const [recordedInputs, setRecordedInputs] = useState<string[]>(tags)

    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [isEditable, setIsEditable] = useState<boolean>(false);

    //Instagram regulation
    //capacity of total number of characters
    const capacity = 10
    //max limit length per a tag.
    const limit = 30

    //decrease capability as many as letters of saved tags.
    function getCurrentCapability() {
        let total = capacity
        for (let i = 0; i < tags.length; i++) {
            if (tags[i]) {
                total -= tags[i].length
            }
        }
        return total
    }
    const [currentCapability, setCurrentCapability] = useState<number>(getCurrentCapability())

    function checkRegulation(result: string) {
        if (result !== undefined && result.length < limit && currentCapability - result.length >= 0) {
            result = result.charAt(0).toUpperCase().concat(result.substring(1, result.length))
            for (let i = 0; i < result.length; i++) {
                let curr = result.charAt(i)
                if (curr == ' ') {
                    let next = result.charAt(i + 1).toUpperCase()
                    result = result.substring(0, i).concat(next + result.substring(i + 2, result.length))
                    // console.log("next:", next, "result :", result)
                }
            }
            addInputs(result)
            // setCurrentCapability(currentCapability - result.length)
        } else if (result !== undefined && result.length >= limit) {
            // console.log("length err exceed limit", result.length)
            Toast.show('Max limit exceeded:\nLength of a tag should be less than ' + limit, Toast.SHORT);
        } else if (result !== undefined && currentCapability - result.length < 0) {
            // console.log("length err exceed cap", result.length, capacity)
            Toast.show('Max capacity exceeded:\nYou have recorded more than ' + capacity + ' letters', Toast.SHORT);
        }
    }
    const DeleteContent = (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        let deleted = words[index]
        delete words[index];
        // let copy = [...words]
        // copy.splice(index, 1)
        setWords(words);
        // setCurrentCapability(currentCapability + deleted.length)
        createContent(words, setWords, setWordContent, isEditable);
        // console.log("after deleted", currentCapability + deleted.length)
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
        setCurrentCapability(getCurrentCapability())
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
        // ToastAndroid.show('Your Message', ToastAndroid.SHORT);

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
            <View style={flexOne}>
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
                                    setIsTyping={setIsTyping}
                                    checkRegulation={checkRegulation}
                                />
                            </KeyboardAvoidingView>
                            {
                                !isTyping &&
                                <MicContainerContainer>
                                    <RecordingButton
                                        fadeInFadeOut={fadeInFadeOut}
                                        isTextMode={isTextMode}
                                        setIsTextMode={setIsTextMode}
                                        checkRegulation={checkRegulation}
                                    />
                                </MicContainerContainer>
                            }
                        </ScrollableView>
                    </Animated.View>
                </SafeArea>
            </View>
        </Container>
    )
}
export default TagRecording
