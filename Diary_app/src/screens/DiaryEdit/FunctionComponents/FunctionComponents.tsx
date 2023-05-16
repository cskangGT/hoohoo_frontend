import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native';
// import { countEx } from '../DiaryDetail';
import PhotoZone, { openCameraEx, openGalleryEx } from './PhotoZone';
import NoteZone, { setWriteDiaryEx, writeDiaryEx } from './NoteZone';
import { TouchableHighlight } from 'react-native-gesture-handler';
const icon_camera = require('../../../assets/DiaryEditPage/Camera.png');
const icon_gallery = require('../../../assets/DiaryEditPage/gallery.png');
const icon_note = require('../../../assets/DiaryEditPage/Note.png');
const PLUS = require('../../../assets/DiaryEditPage/PLUS.png');
// const icon_delete = require('../FunctionComponents/icons/delete.png');
// const icon_edit = require('../FunctionComponents/icons/edit.png');
// 여기서 + 버튼을 부활
// 

// const StyledHorizontallyAlignedItems = styled(View)`
//     flex-direction: row;
//     justify-content: center;
//     align-items: center;
//     flex:1;
//     padding-horizontal: 20px;
// `
const StyledCircleButton = styled(TouchableOpacity)`
    border-width: 1px;
    border-radius: 50px;
    position: absolute;
    background-color: #666666;
    width: 30px;
    height: 30px;
    flex: 1;
    justify-content: center;
    align-items: center;
`
const StyledButtonText = styled(Text)`
    font-size: 21px;
    text-align: center;
    color: white;
`


const StyledTextInput = styled(TextInput)`
    border-radius: 50px;
    border-color: white;
    border-width: 1;
    padding: 15px;
    color:white;
`
export let showPlusButtonEx: any;
interface Props {
    style?: {};
    stack: any[];
    count: number;
    setCount: (any: number) => any;
}
function FunctionComponents(props: Props): JSX.Element {
    // const enableDelete = enableDeleteEx
    // const setEnableDelete = setEnableDeleteEx
    const { style, stack, count, setCount } = props;
    const start_x = 0
    const start_y = 0;
    //camera 
    const [animation1, setAni1] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //gallery
    const [animation2, setAni2] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //note
    const [animation3, setAni3] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    // //remove
    // const [animation4] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    // //edit
    // const [animation5] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));

    //the + button not visible by default
    const [visible, setVisible] = useState<boolean>(false)
    const moveComponent = () => {
        // + 버튼속에 아이콘 높 낮이를 여기서 바꾼다.
        // 카메라 갤러리 따로.
        // 텍스트 컴포넌트
        // 노트존을 하나씩 추가 
        Animated.timing(animation1, {
            toValue: { x: 0, y: -55 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation2, {
            toValue: { x: 0, y: -90 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation3, {
            //높 낮이를 여기서 바꾼다.
            toValue: { x: 0, y: -125 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();

        // Animated.timing(animation4, {
        //     toValue: { x: 0, y: -180 }, // Move component 100 units to the right and 100 units to the bottom
        //     duration: 500, // Move component for 0.5 second
        //     useNativeDriver: true, // Use native driver for better performance
        // }).start();



    };
    const setTransform = (x: Animated.Value, y: Animated.Value) => {

        return {
            transform: [
                {
                    translateX: x,
                },
                {
                    translateY: y,
                },
            ]
        }
    }



    // const animatedStyle4 = setTransform(animation4.x, animation4.y)
    // const animatedStyle5 = setTransform(animation5.x, animation5.y)

    const [isUp, setIsUp] = useState<boolean>(false)
    const animationReset = () => {


        Animated.timing(animation1, {
            toValue: { x: 0, y: 0 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation2, {
            toValue: { x: 0, y: 0 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation3, {
            //높 낮이를 여기서 바꾼다.
            toValue: { x: 0, y: 0 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();



    }
    const animatedStyle1 = setTransform(animation1.x, animation1.y)
    const animatedStyle2 = setTransform(animation2.x, animation2.y)
    const animatedStyle3 = setTransform(animation3.x, animation3.y)

    const [showPlusButton, setShowPlusButton] = useState<boolean>(!writeDiaryEx)
    const updateShowPlus = (tf: boolean) => {
        setShowPlusButton(tf)
    }
    showPlusButtonEx = updateShowPlus
    return (
        <View style={props.style}>
            {/* if user selects a note button, then stop displaying + button. */}
            {/* {enableDelete &&
                <TouchableOpacity onPress={() => { setEnableDelete(false); updateShowPlus(true) }}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            } */}
            {((!writeDiaryEx) || showPlusButton) &&
                <StyledCircleButton
                    activeOpacity={0.8}
                    onPress={() => {
                        if (!visible) {
                            moveComponent();
                            setVisible(!visible)
                        } else {
                            animationReset();
                            setTimeout(() => setVisible(!visible), 300)
                        }
                    }}>

                    <Image source={PLUS} style={{ height: 30, width: 30, borderRadius: 5 }} />

                    {visible && //hidden buttons, visible when + button is clicked.
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                        }}>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle1]}>
                                <TouchableOpacity
                                    onPress={() => {
                                        animationReset();
                                        if (stack !== undefined) {
                                            stack.push(<PhotoZone key={count} />)
                                        }
                                        // setStackComponentEx(stackComponentEx)
                                        setCount(count + 1)
                                        // openCameraEx();
                                        setVisible(false)
                                    }}>
                                    <Image source={icon_camera} key='camera' style={{ height: 30, width: 30, borderRadius: 5 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle2]}>
                                <TouchableOpacity onPress={() => {
                                    animationReset();
                                    if (stack !== undefined) {
                                        stack.push(<PhotoZone key={count} />)
                                    }
                                    // setStackComponentEx(stackComponentEx)
                                    setCount(count + 1);
                                    // openGalleryEx();
                                    setVisible(false)
                                }}>
                                    {/* open gallery */}
                                    <Image source={icon_gallery} key='gallery' style={{ height: 30, width: 30, borderRadius: 5 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle3]}>
                                <TouchableOpacity onPress={() => {
                                    animationReset();
                                    if (stack !== undefined) {
                                        stack.push(<NoteZone key={count} />)
                                    }
                                    // setStackComponentEx(stackComponentEx)
                                    setCount(count + 1)
                                    // setWriteDiaryEx(true) 
                                    setVisible(false)
                                }}>
                                    <Image source={icon_note} key='note' style={{ height: 30, width: 30, borderRadius: 5 }} />
                                </TouchableOpacity>
                            </Animated.View>

                        </View>
                    }

                </StyledCircleButton>
            }

        </View >
    )
}
export default FunctionComponents
