
import React, { useState, useEffect } from 'react';
import { View, Animated, Text, Easing } from 'react-native';
import data from '../../data/data.json'
import { useNavigation } from '@react-navigation/native';
import GIF from 'react-native-gif';
import { BackgroundView, FlexOneView, MajorityView, GIFandTextContainer, NextButtonContainer, ReplayPause, MinorityView, IconContainer, SafeArea } from './styles';
import { IconButton } from 'react-native-paper';

const gif = require('./droplet.gif')

const FadeInOutText = (props: any) => {
    const [fadeAnim] = useState(new Animated.Value(0));
    let delayGIF = 2000 // half of delay 
    useEffect(() => {
        const fadeIn = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: delayGIF,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: delayGIF,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        // if (!props.stay || props.continue) {
        const sequence = Animated.sequence([fadeIn, fadeOut]);
        if (props.isPaused) {
            Animated.sequence([fadeIn]).start()
        } else {
            Animated.loop(sequence).start();
        }
        // } else {
        //     //if stay, don't fade out and dont even loop
        //     // const sequence = Animated.sequence([fadeIn]);
        //     Animated.sequence([fadeIn]).start();
        // }
    }, [])

    return (
        <Animated.View
            style={{
                opacity: fadeAnim,
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
            }}>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.1}
                style={{
                    color: (props.display) ? 'white' : 'black',
                    fontSize: 25,
                    fontFamily: 'Comfortaa-Regular',
                }}>
                {props.text}
            </Text>
        </Animated.View>
    );
};

function Diary(route: any): JSX.Element {
    let index: number = parseInt(route.route.params.index)
    // const [viewButtons, setViewButtons] = useState<boolean>(false)
    const navigation = useNavigation();
    // const [count, setCount] = useState<number>(-1)
    let numberOfTags: number = data[index].tags.length > 7 ? 7 : data[index].tags.length
    let allTags = data[index].tags.slice(0, numberOfTags)
    const [tags, setTags] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)
    const [tagContent, setTagContent] = useState<JSX.Element>()

    const [showPauseButton, setShowPauseButton] = useState<boolean>(false)
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [isPaused, setIsPaused] = useState<boolean>(false)
    useEffect(() => {
        /**
         * set delay based on following conditions
         * 1. delay = 0 if the user visits Diary Page first time. (prevent useEffect execution)
         * 2. delay = 0 if every tag has been displayed and it is time to display the first one again. 
         *  This prevents double rendering process. 
         * 3. Otherwise delay = X000 milsec.  
         */
        let delay = (count == -1 || isFirstVisit) ? 0 : (!isFirstVisit && count == 0) ? 0 : 4000
        const interval = setInterval(() => {
            if (count != -1) { //displaying tags 
                if (isPaused) { //if it was paused but count != -1 which means a opcode for NOT paused,
                    //(count is set 0 when replay button pressed)
                    //updated pause state value.
                    setIsPaused(false)
                }
                //displaying tag one by one and all 
                if (count <= numberOfTags) {
                    let copy = [...allTags]
                    copy.slice(0, count)
                    setTags(copy)
                    setCount(count + 1)
                    //when we display all tags, display replay/pause button
                    if (count == numberOfTags) {
                        setShowPauseButton(true)
                    } else if (count == 0) {
                        setShowPauseButton(false)
                    }
                } else {
                    //if count exceeds the number of tags, reset it  
                    setCount(0) //reset tags. 
                    setTags([])
                }
            } else {
                //i forgot what it does
                // if (!isPaused) {
                // let copy = [...allTags]
                // setTags(copy)
                // }

            }
        }, delay); //4000 is proper

        return () => clearInterval(interval);
    }, [count]);
    useEffect(() => {
        //if first visit, dont do anything
        if (isFirstVisit) {
            setIsFirstVisit(false);
        } else {
            if (tags.length == 0) { //not displaying anything. it occurs after displaying all, before display the first one
                setTagContent(renderTags(-1))
            } else {
                if (count == -1) {  //paused, dispalying all
                    setTagContent(renderTags(numberOfTags))
                } else {
                    //display a single tag or all.
                    setTagContent(renderTags(count))
                }
            }
        }

    }, [tags, isPaused])
    function renderTags(target: number) {
        let upToSevenTags = allTags.map((txt, index) => {
            let display = (index === target) || (target === numberOfTags)
            return (
                <View
                    key={"tagVisible" + index + target + isPaused}
                    style={{
                        flex: 0.3,
                        justifyContent: 'center',
                        alignSelf: (index % 2 == 0) ? 'flex-start' : 'flex-end',
                        paddingLeft: (index % 2 == 0) ? '10%' : 0,
                        paddingRight: (index % 2 == 0) ? 0 : '10%',
                        marginHorizontal: '20%'
                    }}>
                    <GIFandTextContainer
                        key={"GIFandTxtContainer" + index + target}>
                        {display &&
                            <GIF
                                source={gif}
                                style={{
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    width: 200 + txt.length * 5,
                                    height: 200 + txt.length * 5,
                                }}
                                resizeMode="cover"
                                autoPlay={true}
                            />}

                    </GIFandTextContainer>
                    <FadeInOutText
                        key={"fadeText" + index + target}
                        display={display}
                        text={txt}
                        isPaused={isPaused}
                    />
                </View>
            )
        })

        return (
            <FlexOneView >
                {upToSevenTags}
            </FlexOneView>
        )
    }

    return (
        <BackgroundView >
            <SafeArea>
                <MajorityView>
                    {/* <TagContentHolder content={tagContent} /> */}
                    {tagContent}
                </MajorityView>
                <MinorityView >
                    {
                        showPauseButton &&
                        <ReplayPause>
                            <IconContainer
                                icon={
                                    (count == -1) ? "replay" : "pause"
                                }
                                size={50}
                                iconColor='white'
                                onPress={() => {
                                    if (count != -1) { //paused
                                        setCount(-1)
                                        setIsPaused(true)

                                    } else { //replay
                                        setCount(0)

                                        // setIsPaused(false)
                                    }
                                }}
                            />
                        </ReplayPause>
                    }
                    <NextButtonContainer>
                        <IconContainer
                            icon={"chevron-right"}
                            size={50}
                            iconColor='white'
                            onPress={() => {
                                navigation.navigate("DiaryDetail", { index: index })
                            }}
                        />
                    </NextButtonContainer>
                </MinorityView>
            </SafeArea>
        </BackgroundView >
    );
};

export default Diary;