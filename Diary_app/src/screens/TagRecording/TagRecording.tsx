import React, { useEffect, useRef, useState } from 'react'

import { Animated, Text, TouchableOpacity, KeyboardAvoidingView, View, Easing, } from "react-native";
import WordContainer from './Containers/WordContainer';
import UserTextInput from './Containers/UserTextInput';
import RecordingButton from './RecordingButton';
import {
    ButtonContainer, Container,
    MicContainerContainer, NavButton, OpacityView, RemoveButton,
    SafeArea, ScrollableView, TagComponent,
    TagText, TransparentView, contentContainer, flexOne, whiteFont
} from './styles';
import FadeInFadeOutComponent from './Containers/FadeInFadeOutComponent';
import data from '../../data/data.json'
import regulation from '../../data/regulation.json'
import Icon from 'react-native-paper/src/components/Icon';
import { IconButton } from 'react-native-paper';
const Background = require('../../assets/tagRecordingBg.png');
const WaterSpread1 = require('../../assets/WaterSpread1.png')
const WaterSpread2 = require('../../assets/WaterSpread2.png')

const FadeInOutText = (props: any) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    let displayTime = 1500
    useEffect(() => {
        const fadeIn = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: displayTime,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: displayTime - 500,
            easing: Easing.linear,
            useNativeDriver: true,
        })

        Animated.sequence([fadeIn, fadeOut]).start(() => {
            props.setToastVisible(false)
        })
    }, [])
    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                bottom: '10%',
                backgroundColor: 'gray',
                borderRadius: 25,
                padding: '5%',
                width: '60%'
            }}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 15,
                    textAlign: 'center',
                }}>
                {props.text}
            </Text>
        </Animated.View>
    );
};

function TagRecording({ navigation, route }: any): JSX.Element {
    let index: number;

    if (route.params === undefined || route.params.index === undefined) {
        index = 12 // Empty Tag
    } else {
        index = parseInt(route.params.index) // has some tags
    }
    const tags: string[] = index ? data[index].tags : []

    // user typed input
    const [inputs, setInputs] = useState<string[]>([])
    const [recordedInputs, setRecordedInputs] = useState<string[]>(tags)
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [placeholder, setPlaceholder] = useState<string>("Hello");
    // Instagram regulation
    //capacity of total number of characters
    const capacity = regulation.capacity
    //max limit length per a tag.
    const limit = regulation.limit

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

    const [toastMsg, setToastMsg] = useState<string>("")
    const [toastVisible, setToastVisible] = useState<boolean>(false)
    const [toastMsgContent, setToastMsgContent] = useState<JSX.Element>(<FadeInOutText text="" setToastVisible={setToastVisible} />)
    useEffect(() => {
        setToastMsgContent(<FadeInOutText text={toastMsg}
            setToastVisible={setToastVisible}
        />)
    }, [toastVisible])
    function checkRegulation(result: string) {
        if (result !== undefined && result.length < limit && currentCapability - result.length >= 0) {
            result = result.charAt(0).toUpperCase().concat(result.substring(1, result.length))
            for (let i = 0; i < result.length; i++) {
                let curr = result.charAt(i)
                if (curr == ' ') {
                    let next = result.charAt(i + 1).toUpperCase()
                    result = result.substring(0, i).concat(next + result.substring(i + 2, result.length))
                }
            }
            addInputs(result)
        } else if (result !== undefined && result.length >= limit) {
            setToastMsg('Max capacity exceeded:\nYou have recorded more than ' + capacity + ' letters')
            setToastVisible(true)
        } else if (result !== undefined && currentCapability - result.length < 0) {
            setToastVisible(true)
            setToastMsg('Max capacity exceeded:\nYou have recorded more than ' + capacity + ' letters')
        }
    }
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
                        <Icon source="close-circle" size={20} color='white' />
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
        setPlaceholder(word)
        setInputs(inputs)
    }
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const fadeInAndOutAnim = useRef(new Animated.Value(0)).current;
    const fadeInAndOutAnim2 = useRef(new Animated.Value(0)).current;
    //initially enter to text mode.
    const [isTextMode, setIsTextMode] = useState<boolean>(true)
    const [isFirstVisit, setIsFirstVisit] = useState<boolean>(true)
    //used to determine whether display the mode change button or not 
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const [showButton, setShowButton] = useState<boolean>(isTextMode)
    //fade in fade out the textinput and other buttons when mode changed
    useEffect(() => {
        setShowButton(false)
        if (isFirstVisit) {
            Animated.timing(fadeAnim, { //fade in 
                toValue: 1,
                duration: 500,
                delay: 0,
                useNativeDriver: true,
            }).start(() => {
                setIsFirstVisit(false)
                setShowButton(true)
                createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable)
            })
        } else {
            Animated.timing(fadeAnim, { //fade out 
                toValue: 0,
                duration: 500,
                delay: 0,
                useNativeDriver: true,
            }).start(() => {
                setShowButton(true)
                Animated.timing(fadeAnim, {//fade in
                    toValue: 1,
                    duration: 500,
                    delay: 750,
                    useNativeDriver: true,
                }).start(() => {
                    createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder, isEditable)
                })
            });
        }
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
    return (
        <Container source={Background}>
            <View style={flexOne}>
                <SafeArea>
                    <TransparentView>
                        <OpacityView>
                            <FadeInFadeOutComponent
                                source={WaterSpread1}
                                fadeInAndOutAnim={fadeInAndOutAnim}
                                duration={500}
                                delay={(isTextMode) ? 1000 : 0}
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
                                duration={1000}
                                delay={(isTextMode) ? 500 : 1500}
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
                        <ScrollableView
                            keyboardShouldPersistTaps="handled"
                            contentContainerStyle={contentContainer}>
                            <KeyboardAvoidingView style={flexOne}>
                                <ButtonContainer>
                                    <NavButton
                                        title="  List  "
                                        onPress={() => {
                                            navigation.navigate('ListView')
                                        }}
                                        textStyle={whiteFont}
                                    />
                                    {
                                        recordedInputs.length === 0 ?
                                            <View>
                                                <IconButton
                                                    style={{ opacity: 0.3 }}
                                                    icon={'movie-open-play'}
                                                    iconColor='#f1f1f1'
                                                    size={25}
                                                />
                                            </View> :
                                            <TouchableOpacity onPress={() => {
                                                if (recordedInputs.length === 0) {
                                                    setToastMsg('No Tags to show in Diary.')
                                                    setToastVisible(true)
                                                } else {
                                                    navigation.navigate('Diary', { index: index })
                                                }
                                            }}>
                                                <IconButton
                                                    icon={'movie-open-play'}
                                                    iconColor='#f1f1f1'
                                                    size={25}
                                                />
                                            </TouchableOpacity>
                                    }
                                </ButtonContainer>
                                <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>
                                <UserTextInput
                                    setIsTyping={setIsTyping}
                                    checkRegulation={checkRegulation}
                                    currentCapability={currentCapability}
                                    limit={limit}
                                    inputs={inputs}
                                    placeholder={placeholder}
                                    setPlaceholder={setPlaceholder}
                                />
                            </KeyboardAvoidingView>
                            {!isTyping &&
                                <MicContainerContainer>
                                    {
                                        (showButton) &&
                                        <RecordingButton
                                            fadeInFadeOut={fadeInFadeOut}
                                            isTextMode={isTextMode}
                                            setIsTextMode={setIsTextMode}
                                            checkRegulation={checkRegulation}
                                        />
                                    }
                                </MicContainerContainer>
                            }
                            {
                                toastVisible &&
                                toastMsgContent
                            }
                        </ScrollableView>
                    </Animated.View>
                </SafeArea>
            </View>
        </Container>
    )
}
export default TagRecording
