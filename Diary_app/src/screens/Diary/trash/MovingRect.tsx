import { View, Text, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { SafeAreaView } from 'react-native';
import LimitedText from './LimitedText';

type ItemProps = { title: string, index: number };

const Item = ({ title, index }: ItemProps & { index: number }) => {
    const isEven = index % 2 === 0;
    let leftMargin = (isEven) ? 20 : 0
    let rightMargin = (isEven) ? 0 : leftMargin
    return (
        <View
            style={{
                padding: 10,
                zIndex: -1,
                alignItems: isEven ? 'flex-start' : 'flex-end',
                marginLeft: leftMargin,
                marginRight: rightMargin,
                // borderWidth: 1,
                // borderColor: 'black',
            }}
        >
            <LimitedText
                text={title}
                isEven={isEven}
                leftMargin={leftMargin}
                rightMargin={rightMargin}
            />

        </View>
    );
};
function MovingRect(props: any): JSX.Element {
    const isEven = props.index % 2 === 0;
    const [Mwidth, setMWidth] = useState<number>(0)
    const [Mleft, setMLeft] = useState<number>(0)
    const windowWidth = Dimensions.get('window').width
    const [Mright, setMRight] = useState<number>(windowWidth)
    let revealDelay = 50
    const revealArea_Mwidth = useRef(0);
    const move_Middle = useRef(0);
    const done = useRef(0)
    let speed = 5
    useEffect(() => {
        if (done.current == 0) {
            const intervalId = setInterval(() => {
                let align = 150
                let maxAlign = 35  //the lower it is , the wider the width is
                if (isEven) {
                    let max_Right = align
                    if (revealArea_Mwidth.current < max_Right) {
                        revealArea_Mwidth.current += speed
                        setMWidth(Mwidth + revealArea_Mwidth.current)
                        if (revealArea_Mwidth.current > max_Right - maxAlign) {
                            move_Middle.current += speed //the state value is the same, but useRef value increases.
                            setMLeft(Mleft + move_Middle.current)
                        }
                    }
                } else {
                    let max_Left = align
                    if (revealArea_Mwidth.current < max_Left) {
                        revealArea_Mwidth.current += speed
                        setMWidth(Mwidth + revealArea_Mwidth.current)
                        if (revealArea_Mwidth.current > max_Left - maxAlign) {
                            move_Middle.current += speed //the state value is the same, but useRef value increases.
                            setMRight(Mright - move_Middle.current)
                        }
                    }
                }
                
                if (isEven) {
                    let max_Right = align
                    if (revealArea_Mwidth.current >= max_Right) {
                        done.current = 1
                        clearInterval(intervalId);
                    }
                }else{
                    let max_Left = align
                    if (revealArea_Mwidth.current >= max_Left) {
                        done.current = 1
                        clearInterval(intervalId);
                    }
                }
            }, revealDelay);
            return () => clearInterval(intervalId);
        }
    }, []);
    return (
        <View >
            {/* left black box */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: (isEven) ? 0 : -Mwidth, //20 is adjustment 
                    right: 0,
                    bottom: 0,
                    width: (isEven) ? Mleft : windowWidth,
                    backgroundColor: 'black',
                }}
            ></View>
            {/* middle transparent box
            <View style={{
                // position: 'absolute',
                // top: 0,
                // left: (isEven) ? Mleft : Mright - Mwidth,
                // right: 0,
                // bottom: 0,
                // width: Mwidth,
                
            }}>
            </View> */}

            {/* right black box */}
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: (isEven) ? Mwidth : Mright+20, //20 is adjustment 
                    right: 0,
                    bottom: 0,
                    width: (isEven) ? windowWidth : Mright,
                    backgroundColor: 'black'
                }}
            ></View>
            <Item
                title={props.title} index={props.index} />
        </View>
    );
};
export default MovingRect;
