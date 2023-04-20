import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ScrollView, Image } from 'react-native';
import { TextInput } from 'react-native';
import { countEx, setCountEx, enableDeleteEx, setEnableDeleteEx } from '../DiaryDetail';
import { openCameraEx, openGalleryEx } from './PhotoZone';
import { setWriteDiaryEx, writeDiaryEx } from './NoteZone';
const icon_camera = require('../FunctionComponents/icons/camera.png');
const icon_gallery = require('../FunctionComponents/icons/gallery.png');
const icon_note = require('../FunctionComponents/icons/note.png');
// const icon_delete = require('../FunctionComponents/icons/delete.png');
const icon_edit = require('../FunctionComponents/icons/edit.png');
const StyledHorizontallyAlignedItems = styled(View)`
flex-direction: row;
 justify-content: center;
 align-items: center;
 flex:1;
 padding-horizontal: 20;
`
const StyledCircleButton = styled(TouchableOpacity)`
border-width: 1;
border-radius: 50;
background-color: #666666;
width: 100%;
height: 50;
flex: 1;
justify-content: center;
align-items: center;
`
const StyledButtonText = styled(Text)`
font-size: 25;
text-align: center;
color: white;
`


const StyledTextInput = styled(TextInput)`
border-radius: 50;
border-color: white;
border-width: 1;
padding: 15px;
color:white;
`
export let showPlusButtonEx:any;
function FunctionComponents(): JSX.Element {
    const enableDelete = enableDeleteEx
    const setEnableDelete = setEnableDeleteEx

    const button_size = 25
    const start_x = 0
    const start_y = -button_size;
    //camera 
    const [animation1] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //gallery
    const [animation2] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //note
    const [animation3] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //remove
    const [animation4] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));
    //edit
    const [animation5] = useState(new Animated.ValueXY({ x: start_x, y: start_y }));

    //the + button not visible by default
    const [visible, setVisible] = useState<boolean>(false)
    const moveComponent = () => {
        Animated.timing(animation1, {
            toValue: { x: -100, y: -button_size }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation2, {
            toValue: { x: -75, y: -100 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation3, {
            toValue: { x: 75, y: -100 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation4, {
            toValue: { x: 100, y: -button_size }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
        Animated.timing(animation5, {
            toValue: { x: 0, y: -150 }, // Move component 100 units to the right and 100 units to the bottom
            duration: 500, // Move component for 0.5 second
            useNativeDriver: true, // Use native driver for better performance
        }).start();
    };
    const setTransform = (x: Animated.Value, y: Animated.Value) => {
        return{
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

    const animatedStyle1 = setTransform(animation1.x, animation1.y)
    const animatedStyle2 = setTransform(animation2.x, animation2.y)
    const animatedStyle3 = setTransform(animation3.x, animation3.y)
    const animatedStyle4 = setTransform(animation4.x, animation4.y)
    const animatedStyle5 = setTransform(animation5.x, animation5.y)
    const animationReset = () => {
        animation1.setValue({ x: start_x, y: start_y });
        animation2.setValue({ x: start_x, y: start_y });
        animation3.setValue({ x: start_x, y: start_y });
        animation4.setValue({ x: start_x, y: start_y });
        animation5.setValue({ x: start_x, y: start_y });
    }
    
    const [showPlusButton, setShowPlusButton] = useState<boolean>(!writeDiaryEx && !enableDelete)
    const updateShowPlus=(tf:boolean)=>{
        setShowPlusButton(tf)
    }
    showPlusButtonEx=updateShowPlus
    return (
        <View >
            {/* if user selects a note button, then stop displaying + button. */}
            {enableDelete &&
                <TouchableOpacity onPress={() => { setEnableDelete(false);updateShowPlus(true) }}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            }
            {((!writeDiaryEx && !enableDelete)||showPlusButton) &&
                <StyledCircleButton style={{
                    position: 'absolute',
                    // left:'50%',
                    width: '100%'
                }}
                    onPress={() => {
                        if (!visible) {
                            moveComponent();
                        } else {
                            animationReset();
                        }
                        setVisible(!visible);
                    }}>
                    <StyledButtonText style={{
                        position: 'absolute',
                        // left:'50%',
                        width: '100%'
                    }}>
                        +
                    </StyledButtonText>
                    {visible && //hidden buttons, visible when + button is clicked.
                        <View style={{
                            position: 'absolute',
                            width: '100%',
                        }}>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle1]}>
                                <TouchableOpacity
                                    onPress={() => { openCameraEx(); animationReset(); setVisible(false) }}>
                                    <Image source={icon_camera} key='camera' style={{ height: 50, width: 50, borderRadius: 50 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle2]}>
                                <TouchableOpacity onPress={() => { openGalleryEx(); animationReset(); setVisible(false) }}>
                                    {/* open gallery */}
                                    <Image source={icon_gallery} key='gallery' style={{ height: 50, width: 50, borderRadius: 50 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle3]}>
                                <TouchableOpacity onPress={() => {
                                    setWriteDiaryEx(true)
                                    animationReset()
                                    setVisible(false)
                                }}>
                                    <Image source={icon_note} key='note' style={{ height: 50, width: 50, borderRadius: 50 }} />
                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle5]}>
                                <TouchableOpacity onPress={() => { setEnableDelete(true); setVisible(false) }}>
                                    {/* enable edit mode */}
                                    <Image source={icon_edit} key='edit' style={{ height: 50, width: 50, borderRadius: 50 }} />
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    }
                </StyledCircleButton>
            }

        </View>
    )
}
export default FunctionComponents
