
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Animated, Text, TouchableOpacity } from 'react-native';
import diaryData from '../../data/diaryData.json'
import { useNavigation } from '@react-navigation/native';

import FastImage from 'react-native-fast-image';
import GIF from 'react-native-gif';
// const blackCircleSize = 450;


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
const HiddenTag = (props: any) => {
    let gif = require('./sample.gif')
 
    const droplet = props.droplet ? (<View>
        <GIF
            source={gif}
            // source={{ uri: gifUri }}
            style={{ width: 200, height: 200 ,position: 'absolute',}}
            resizeMode="contain"
            autoPlay={true}
            onGIFEnd={() => console.log('GIF ended')}
            loop={false}

        />
        {/* <FastImage
            style={{
                width: 200, height: 200,
                position: 'absolute',
            }}
            // source = {gif}
            source={{ uri: gifUri }}
            // cache='reload' 
            // cache={{ cache: 'reload' }}
            resizeMode={FastImage.resizeMode.contain}
            key = {props.ki}

        /> */}
    </View>) : (<View></View>)
    return (
        <View style={{
            // position: 'relative',
            width: 400,
            height: 150,
            // flex: 1

            borderColor: 'red',
            borderWidth: 1
        }}>
            {droplet}
            <Text
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
            </Text>
            {/* <Animated.View style={{
                transform: [{ translateX: props.position }],
                position: 'absolute',
                // borderColor:1,
                // borderRadius: blackCircleSize,
                backgroundColor: 'black',
                width: blackCircleSize,
                height: blackCircleSize,
                top: -20,
                left: -50
            }} /> */}
        </View>
    )
}

function Diary(): JSX.Element {

    const [position1, setPosition1] = useState<Animated.Value>(new Animated.Value(0));
    const [position2, setPosition2] = useState<Animated.Value>(new Animated.Value(0));
    const [position3, setPosition3] = useState<Animated.Value>(new Animated.Value(0));
    const [position4, setPosition4] = useState<Animated.Value>(new Animated.Value(0));
    const [position5, setPosition5] = useState<Animated.Value>(new Animated.Value(0));
    const positionList: Animated.Value[] = [position1, position2, position3, position4, position5]
    const [currIndex, setCurrIndex] = useState<number>(0)
    const [viewButtons, setViewButtons] = useState<boolean>(false)
    const navigation = useNavigation();

    const [count, setCount] = useState<number>(-1)
    useEffect(() => {
        if (currIndex == positionList.length) {
            setViewButtons(true)
            return
        } else {
            const newAnimation = Animated.timing(positionList[currIndex], {
                toValue: 500,
                duration: 1,//500 is good
                useNativeDriver: true,
            }).start(() => {
                setCurrIndex(currIndex + 1)
            });
        }
    }, [positionList, currIndex]);

    const data = diaryData.data
    const index = 0
    const text1: string = data[index].content[0]
    const text2: string = data[index].content[1]
    const text3: string = data[index].content[2]
    const text4: string = data[index].content[3]
    const text5: string = data[index].content[4]

    const texts = [data[index].content[0], data[index].content[1], data[index].content[2], data[index].content[3], data[index].content[4]]
    const [tagContent, setTagContent] = useState<JSX.Element[]>([]);


    useEffect(() => {
        const interval = setInterval(() => {
            // if (count > 5) {
            // clearInterval(interval);
            // } else {
            let updatedContent: JSX.Element[] = [];
            for (let i = 0; i < (count + 1) % 5 + 1; i++) {
                let droplet = ((count + 1) % 5 == i);
                // console.log("count", (count + 1) % 5, "i", i, " drop let:", droplet, "_text", texts[i]);
                updatedContent.push(<HiddenTag ki={count} droplet={droplet} key={(count + 1) % 5} text={texts[i]} />)
            }
            setTagContent(updatedContent)
            setCount((count + 1) % 5);
            // }
        }, 2000);

        return () => clearInterval(interval);
    }, [count]);



    return (
        <View style={{
            backgroundColor: 'black',
            width: '100%',
            height: '100%'
        }}>

            <TagContentHolder content={tagContent} />
            {/* <HiddenTag text={text1} position={positionList[0]} />
            <HiddenTag text={text2} position={positionList[1]} />
            <HiddenTag text={text3} position={positionList[2]} />
            <HiddenTag text={text4} position={positionList[3]}  />
            <HiddenTag text={text5} position={positionList[4]} /> */}
            <View style={{
                position: 'absolute',
                bottom: 0,
                height: 50,
                alignSelf: 'center'
            }}>

                {viewButtons &&
                    <View style={{
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('DiaryDetail', { index: index })
                        }
                        } style={{
                            borderColor: 'white',
                            borderWidth: 1,
                            borderRadius: 25,
                            width: 150,
                            alignItems: 'center',
                            padding: 5

                        }}>
                            <Text style={{
                                color: 'white',
                            }}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity>
                        <Text style={{
                            color:'white'
                        }}>
                            See All
                        </Text>
                    </TouchableOpacity> */}
                    </View>
                }
            </View>
        </View >
    );
};

export default Diary;
