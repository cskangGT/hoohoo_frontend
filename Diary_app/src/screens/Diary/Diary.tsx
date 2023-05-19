
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity, Easing, Dimensions } from 'react-native';
import diaryData from '../../data/diaryData.json'
import { useNavigation } from '@react-navigation/native';

import GIF from 'react-native-gif';

const next_Detail = require("../../assets/DiaryEditPage/SideButton.png")
const replay = require("../../assets/replay.png")

// import Sound from 'react-native-sound';
// import SoundPlayer from 'react-native-sound-player'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

function TagContentHolder(props: any): JSX.Element {
    let contentHolder: JSX.Element = (
        props.content.map((item: JSX.Element, index: number) => (
            <View key={index}>
                {item}
            </View>
        ))
    )
    return (
        <View style={{
            alignItems: 'center', justifyContent: 'center'
        }}>
            {contentHolder}
        </View >
    )
}

const FadeInOutText = (props: any) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        const fadeIn = Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        const fadeOut = Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
        });

        if (!props.stay || props.continue) {
            const sequence = Animated.sequence([fadeIn, fadeOut]);

            Animated.loop(sequence).start();
        } else {
            //if stay, don't fade out and dont even loop
            // const sequence = Animated.sequence([fadeIn]);
            Animated.sequence([fadeIn]).start();
        }
    }, []);


    return (
        <Animated.View style={{
            opacity: fadeAnim,
        }}>
            {/* {droplet} */}
            {
                props.isButton &&
                <Image
                    style={{
                        width: 50,
                        height: 50
                    }}
                    source={props.source}
                />
            }
            {
                !props.isButton &&
                <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit={true}
                    minimumFontScale={0.1}
                    style={{
                        color: 'white',
                        fontSize: 25,
                        fontFamily: 'Comfortaa-Regular'


                    }}>
                    {props.text}
                </Text>
            }



        </Animated.View>
    );
};

const HiddenTag = (props: any) => {

    let gif = require('./droplet.gif')
    let gifSize = WIDTH / 2 + props.text.length * 5
    let adjust = WIDTH / 15 //used to adjust the location of droplet on a word.
    const droplet = (props.droplet || props.showAll) ? (<View>
        <GIF
            source={gif}
            style={{
                width: gifSize, height: gifSize, position: 'absolute', top: -gifSize / 2 + adjust, left: -gifSize / 2, right: 0, marginLeft: 'auto', marginRight: 'auto'
            }}
            resizeMode="contain"
            autoPlay={true}
            loop={false}
        />
    </View>) : (<View></View>)

    let left = props.index % 2 == 0 ? -WIDTH / 3 + props.text.length * 5 : WIDTH / 3 - props.text.length * 5
    return (
        <View style={{
            // width: 400,
            height: '13%',

        }}>
            {(props.droplet || props.showAll) &&
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    left: left,

                }}>
                    <View style={{
                        position: 'absolute',
                    }} >
                        <FadeInOutText
                            text={props.text}
                            stay={props.showAll}
                        >
                        </FadeInOutText>

                    </View>
                    <View style={{
                        position: 'absolute',
                        borderWidth: 1
                    }}>
                        {droplet}
                    </View>
                </View>
            }
        </View>

    )
}

function Diary(): JSX.Element {


    // console.log("Dimension", Dimensions.get('window').width,Dimensions.get('window').height)
    const [viewButtons, setViewButtons] = useState<boolean>(false)
    const navigation = useNavigation();

    const [count, setCount] = useState<number>(-1)


    const data = diaryData.data
    const index = 0
    const text1: string = data[index].content[0]
    const text2: string = data[index].content[1]
    const text3: string = data[index].content[2]
    const text4: string = data[index].content[3]
    const text5: string = data[index].content[4]
    const text6: string = data[index].content[5]
    const text7: string = data[index].content[6]
    // const texts = [text1, text2, text3, text4, text5, text6, text7]
    const texts = ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"];
    const [tagContent, setTagContent] = useState<JSX.Element[]>([]);

    const [showAll, setShowAll] = useState<boolean>(false)
    useEffect(() => {
        let delay = (count == -1) ? 0 : 100
        const interval = setInterval(() => {
            if (count < texts.length) {
                let updatedContent: JSX.Element[] = [];
                for (let i = 0; i < texts.length; i++) {
                    if (count + 1 < i) {
                        break;
                    }
                    let droplet = ((count + 1) % texts.length == i);
                    let newshowAll = (count + 1) == texts.length
                    //do not change the key. if it is i, it won't be displayed at the end
                    updatedContent.push(<HiddenTag index={i} showAll={newshowAll} droplet={droplet} key={(count + 1) % 5} text={texts[i]} />)
                    setShowAll(newshowAll)
                    if (newshowAll) {
                        setViewButtons(true)
                    }

                }
                setTagContent(updatedContent)
                // setCount((count + 1) % 5);
                setCount(count + 1)

            }

        }, delay); //4000 is proper

        return () => clearInterval(interval);
    }, [count]);



    return (
        <View style={{
            backgroundColor: 'black',
            width: '100%',
            height: '100%'
        }}>
            {/* <TouchableOpacity onPress={playMusic}>
                <Text style={
                    { color: 'white' }
                }>Play Music</Text>
            </TouchableOpacity> */}
            <View style={{
                marginTop: '7.5%' //50
            }}>
                <TagContentHolder content={tagContent} />
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                height: '15%', //100
                alignSelf: 'center'
            }}>
                {viewButtons &&
                    <View style={{
                        // alignItems: 'center',
                        flexDirection: 'row', justifyContent: 'center',
                        padding:'5%'
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '50%'
                            }}
                            onPress={() => { setCount(-1); setViewButtons(false); }}>
                            <FadeInOutText
                                style={{
                                    color: 'white',
                                }}
                                // text="Replay"
                                isButton={true}
                                source={replay}
                                stay={true}
                                continue={true}>
                            </FadeInOutText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                width: '50%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end'
                            }}
                            onPress={() => {
                                navigation.navigate("DiaryDetail", { index: index })
                            }}>
                            <FadeInOutText
                                style={{
                                    color: 'white',
                                    alignSelf: 'flex-end'
                                }}
                                // text="Continue"
                                isButton={true}
                                source={next_Detail}
                                stay={true}
                                continue={true}
                            >
                            </FadeInOutText>
                        </TouchableOpacity>

                    </View>
                }
            </View>
        </View >
    );
};

export default Diary;

// const playMusic = () => {
//     console.log("play it")
//     const sound = new Sound('rainsound.mp3', Sound.MAIN_BUNDLE, (error) => {
//         if (error) {
//             console.log('Failed to load the sound', error);
//             return;
//         }
//     });
//     console.log("soundosund", sound)
//     sound.play((success) => {
//         if (success) {
//             console.log('successfully finished playing');
//         } else {
//             console.log('playback failed due to audio decoding errors');
//         }
//     });
//     sound.setVolume(1);
// };

// const [position1, setPosition1] = useState<Animated.Value>(new Animated.Value(0));
// const [position2, setPosition2] = useState<Animated.Value>(new Animated.Value(0));
// const [position3, setPosition3] = useState<Animated.Value>(new Animated.Value(0));
// const [position4, setPosition4] = useState<Animated.Value>(new Animated.Value(0));
// const [position5, setPosition5] = useState<Animated.Value>(new Animated.Value(0));
// const positionList: Animated.Value[] = [position1, position2, position3, position4, position5]
// const [currIndex, setCurrIndex] = useState<number>(0)
// let updatedContent: JSX.Element[] = [];
// for (let i = 0; i < (count + 1) % 5 + 1; i++) {
//     console.log("ount",count, "i:",i)
//     let droplet = ((count + 1) % 5 == i);
//     let showAll = (count + 1) == texts.length
//     updatedContent.push(<HiddenTag showAll={showAll} droplet={droplet} key={(count + 1) % 5} text={texts[i]} />)
//     // updatedContent.push(<FadeInOutText text={texts[i]} />)
// }
// setTagContent(updatedContent)
// // setCount((count + 1) % 5);
// setCount(count+1)
// useEffect(() => {
//     if (currIndex == 5) {
//         // setViewButtons(true)
//         return
//     } else {
//         const newAnimation = Animated.timing(positionList[currIndex], {
//             toValue: 500,
//             duration: 1,//500 is good
//             useNativeDriver: true,
//         }).start(() => {
//             setCurrIndex(currIndex + 1)
//         });
//     }
// }, [positionList, currIndex]);
{/* <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                minimumFontScale={0.1}
                style={{
                    color: 'white',
                    borderRadius: 50,
                    position: 'absolute',
                    top: 25,
                    fontSize: 50,
                }}>
                {props.text}
            </Text> */}

// const [fadeAnim] = useState(new Animated.Value(0));
// React.useEffect(() => {


//     Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 2000,
//         useNativeDriver: true,
//     }).start(() => {
//         //unless it must stay, disappear!
//         if (!props.stay) {
//             Animated.timing(fadeAnim, {
//                 toValue: 0,
//                 duration: 2000,
//                 useNativeDriver: true,
//             }).start();
//         }

//     });
// }, []);

{/* <HiddenTag text={text1} position={positionList[0]} />
            <HiddenTag text={text2} position={positionList[1]} />
            <HiddenTag text={text3} position={positionList[2]} />
            <HiddenTag text={text4} position={positionList[3]}  />
            <HiddenTag text={text5} position={positionList[4]} /> */}