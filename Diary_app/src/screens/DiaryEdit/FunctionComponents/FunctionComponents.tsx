import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { ScrollView, Image } from 'react-native';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { TouchableHighlight } from 'react-native';
import { TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { countEx, setCountEx, updateTagZoneEx } from '../DiaryEdit';
const icon_camera = require('../FunctionComponents/icons/camera.png');
const icon_gallery = require('../FunctionComponents/icons/gallery.png');
const icon_note = require('../FunctionComponents/icons/note.png');
const icon_delete = require('../FunctionComponents/icons/delete.png');
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

const StyledHorizontalScrollViewOverflow = styled(View)`
overflow: hidden;
border-radius:30;
margin:5px;
`
const StyledScrollHorizontalScroll = styled(ScrollView)`
background-color: #666666AA;
border-radius:30;
paddingHorizontal: 5px;
`

const StyledTextInput = styled(TextInput)`
border-radius: 50;
border-color: white;
border-width: 1;
padding: 15px;
color:white;
`
export let setCountInc:any;
export let setCountDec:any; //setState
export let editEnable:boolean;
export let setEditEnable:any;

function Photos(props: any & JSX.Element): JSX.Element {
    return (
        <StyledHorizontalScrollViewOverflow >
            <StyledScrollHorizontalScroll horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    props.content
                }
            </StyledScrollHorizontalScroll>
        </StyledHorizontalScrollViewOverflow>
    )
}
function FunctionComponents(): [JSX.Element, JSX.Element, JSX.Element, string] {
    let options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    const [photo, setPhoto] = useState<string[]>([])
    const [photoContent, setPhotoContent] = useState<JSX.Element[]>()

    const [enableDelete, setEnableDelete] = useState<boolean>(false)
    // const [count, setCount] = useState<number>(0)
    const count = countEx
    const setCount = setCountEx
    
    useEffect(() => {
        setEnableDelete(enableDelete)
        setPhoto(photo)
    })
    const openCamera = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const result = await launchCamera(options)
                if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                    photo.push(result.assets[0].uri)
                    setPhoto(photo)
                    setCount(count + 1)
                    // increaseCount()
                    setEnableDelete(false)
                    updatePhotoContent()
                }
            }
        } catch (error) {
            console.log(error) // handle error
        }
        setVisible(false)
        animationReset()

    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        if (result.assets !== undefined && result.assets[0].uri !== undefined) {
            photo.push(result.assets[0].uri)
            setPhoto(photo)
            setCount(count + 1)
            // increaseCount()
            setEnableDelete(false)
            updatePhotoContent()

        }
        setVisible(false)
        animationReset()
    }
    const deletePhoto = (deletable: boolean, index: number) => {
        if (deletable) {
            // if (enableDelete)
            delete photo[index]
            setPhoto(photo)
            setCount(count - 1)
            // decreaseCount()
            updatePhotoContent()

            // setEnableDelete(false)
        }
        setVisible(false)
        animationReset()
    }
    useEffect(() => {
        if (enableDelete && count == 0) {
            setEnableDelete(false)
        }
        updateTagZoneEx()
        updatePhotoContent() //새 state 값과 함께 해당지역 새로 만들어주면됨~
    }, [enableDelete, count])

    //포토에 새로운값이 들어왔다면, 즉각 컨텐츠를 업데이트.
    const updatePhotoContent = () => {
        let contentHolder = (
            photo.map((picture: string, index: number) => (
                <View style={{ position: 'relative' }}>
                    <TouchableHighlight onLongPress={() => setEnableDelete(true)} key={index}
                        style={{
                            margin: 5,

                        }}>

                        <Image source={{ uri: picture }} key={index} style={{ height: 150, width: 150, borderRadius: 50 }} />
                    </TouchableHighlight >
                    <View style={{ position: 'absolute', right: 0 }}>
                    {
                        enableDelete &&
                        //must componentize this. (duplicate code in diaryedit)
                        <TouchableHighlight
                            onPress={() => {deletePhoto(enableDelete, index)}}
                            style={{
                                borderRadius: 50,
                                borderColor: 'white',
                                backgroundColor:'black',
                                width:25,
                                height:25,
                            }}>
                            <Text style={{
                                color: 'white',
                                textAlign:'center'
                            }}>
                                X
                            </Text>
                        </TouchableHighlight>
                    }
                    </View>
                </View>
            ))
        )

        setPhotoContent(contentHolder)
    }

    //remove pictures
    const toggleDeletePhoto = () => {
        setEnableDelete(!enableDelete)
    }
    const navigation = useNavigation();
    const removeCurrentDiary = () => {
        //remove algorithm is not implemented yet.
        navigation.navigate('Diary')
    }

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

    const animatedStyle1 = {
        transform: [
            {
                translateX: animation1.x,
            },
            {
                translateY: animation1.y,
            },
        ],
    };
    const animatedStyle2 = {
        transform: [
            {
                translateX: animation2.x,
            },
            {
                translateY: animation2.y,
            },
        ],
    };
    const animatedStyle3 = {
        transform: [
            {
                translateX: animation3.x,
            },
            {
                translateY: animation3.y,
            },
        ],
    };
    const animatedStyle4 = {
        transform: [
            {
                translateX: animation4.x,
            },
            {
                translateY: animation4.y,
            },
        ],
    };
    const animatedStyle5 = {
        transform: [
            {
                translateX: animation5.x,
            },
            {
                translateY: animation5.y,
            },
        ],
    };
    const animationReset = () => {
        animation1.setValue({ x: start_x, y: start_y });
        animation2.setValue({ x: start_x, y: start_y });
        animation3.setValue({ x: start_x, y: start_y });
        animation4.setValue({ x: start_x, y: start_y });
        animation5.setValue({ x: start_x, y: start_y });
    }
    const [writeDiary, setWriteDiary] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const [returnText, setReturnText] = useState<string>('')

    
    //export count variable to DiaryEditFile
    
    editEnable = enableDelete
    setEditEnable = setEnableDelete
    const Textinput = (
        <View>
            {/* textinput on/off */}
            {writeDiary &&
                <View>
                    <StyledTextInput
                        autoFocus={true}
                        placeholder='Write a note'
                        value={text}
                        multiline={true}
                        onChangeText={(text) => { setText(text); setReturnText(text) }}
                    />
                    <StyledHorizontallyAlignedItems
                        style={{
                            justifyContent: 'flex-end', alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity onPress={() => { console.log("save the text"); setWriteDiary(false); setReturnText(text); }}
                            style={{
                                borderColor: '#8FDF70',
                                borderWidth: 1,
                                borderRadius: 50,
                                backgroundColor: '#8FDF70',
                                width: 50
                            }}>
                            {/* save a note */}
                            <StyledButtonText>
                                &#10003;
                            </StyledButtonText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setWriteDiary(false); setText('') }}
                            style={{
                                borderColor: '#FF2511',
                                borderWidth: 1,
                                borderRadius: 50,
                                backgroundColor: '#FF2511',
                                width: 50
                            }}>
                            {/* delete a note     */}
                            <StyledButtonText>
                                &#65794;
                            </StyledButtonText>
                        </TouchableOpacity>
                    </StyledHorizontallyAlignedItems>
                </View>
            }
        </View >
    )
    return [(
        <View >
            {/* if user selects a note button, then stop displaying + button. */}
            {enableDelete && 
                <TouchableOpacity onPress={()=>{setEnableDelete(false)}}>
                    <Text style={{
                        color:'white'
                    }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            }
            {(!writeDiary && !enableDelete)  &&
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
                            // left:'50%',
                            width: '100%'
                        }}>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle1]}>
                                <TouchableOpacity
                                    onPress={openCamera}>
                                    {/* open camera  */}
                                    {/* &#x1F4F7; is the unicode for camera emoji */}
                                    {/* <StyledText>
                                        &#x1F4F7;
                                    </StyledText> */}
                                    <Image source={icon_camera} key='camera' style={{ height: 50, width: 50, borderRadius: 50 }} />

                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle2]}>
                                <TouchableOpacity onPress={openGallery}>
                                    {/* open gallery */}
                                    <Image source={icon_gallery} key='gallery' style={{ height: 50, width: 50, borderRadius: 50 }} />

                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle3]}>
                                <TouchableOpacity onPress={() => {
                                    setWriteDiary(true); setVisible(false)
                                    animationReset()

                                }}>
                                    <Image source={icon_note} key='note' style={{ height: 50, width: 50, borderRadius: 50 }} />

                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle4]}>
                                <TouchableOpacity onPress={removeCurrentDiary}>
                                    {/* remove current diary */}
                                    <Image source={icon_delete} key='delete' style={{ height: 50, width: 50, borderRadius: 50 }} />

                                </TouchableOpacity>
                            </Animated.View>
                            <Animated.View style={[{
                                position: 'absolute',
                            }, animatedStyle5]}>
                                <TouchableOpacity onPress={()=>{setEnableDelete(true)}}>
                                    {/* enable edit mode */}
                                    <Image source={icon_edit} key='edit' style={{ height: 50, width: 50, borderRadius: 50 }} />

                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    }
                </StyledCircleButton>
            }

        </View>
    ), count != 0 ? <Photos content={photoContent as JSX.Element[]}></Photos> : <View ></View>,
        Textinput, returnText]
}
export default FunctionComponents
