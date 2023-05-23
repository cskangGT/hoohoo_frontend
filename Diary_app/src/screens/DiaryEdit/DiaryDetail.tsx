import { View, ScrollView, ImageBackground, Text, Dimensions, TouchableOpacity, FlatList, TextInput, Image, Button, TouchableWithoutFeedback, Platform, PermissionsAndroid } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { SafeArea, SmallIconContainer, StyledBackgroundView, IndividualTagContainer, TagZoneContainer, TagZoneFirstRow, TagText, TagZoneSecondRow, VerticalList, RemoveIconContainer, RemoveIcon, FooterContainer, FABTheme, FabContainer, DateContainer, NextButtonContainer, FabStyle } from './styles';
import data from '../../data/data.json'
// import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-paper/src/components/Icon'
const background = require('../../assets/DiaryEditPage/Background.png');
import { FAB, Portal, PaperProvider, DefaultTheme, IconButton } from 'react-native-paper';
import DiaryDate from './DiaryDate';
import Swiper from 'react-native-swiper'
import TagContainer from './Containers/TagContainer';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

function DiaryEdit(route: any): JSX.Element {
    const navigation = useNavigation();
    let index: number = parseInt(route.route.params.index)
    let date: string;
    if (index === undefined) {
        index = 4
        let today = new Date()
        let y = today.getFullYear()
        let m = today.getMonth() + 1
        let d = today.getDate()
        date = m + "/" + d + "/" + y
    } else {
        date = data[index].date
    }
    //is the FAB open or not
    const [isOpen, setIsOpen] = useState<boolean>(false)

    //attach: notes & photos
    const [attach, setAttach] = useState<JSX.Element[]>([])
    const [attachContent, setAttachContent] = useState<JSX.Element>(renderAttach);

    const [deletable, setDeletable] = useState<boolean>(false)
    //update attachment content with current attachment sources
    function renderAttach() {
        const isTouchableWithoutFeedback = (element: JSX.Element): element is JSX.Element & { type: typeof TouchableWithoutFeedback } => {
            return element.type === TouchableWithoutFeedback;
        };

        let tagList = attach.map((attached, index) => (
            <View
                // activeOpacity={1}
                // onLongPress={() => { console.log("hahahah") }}
                key={"attached" + index}
                style={{
                    width: '100%',
                    height: isTouchableWithoutFeedback(attached) ? undefined : 300,
                    borderRadius: isTouchableWithoutFeedback(attached) ? 15 : 25,
                    overflow: 'hidden',
                    alignItems: 'center',
                    // backgroundColor: isTouchableWithoutFeedback(attached) ? 'rgba(71, 71, 70,0.4)' : undefined,
                    backgroundColor: isTouchableWithoutFeedback(attached) ? 'rgba(71, 71, 70,0.4)' : 'transparent',
                    padding: isTouchableWithoutFeedback(attached) ? '1%' : undefined,
                    marginTop: '1%',
                    marginBottom: '1%',
                    justifyContent: 'center',
                    alignSelf: 'center',
                }}
            >
                {deletable &&
                    <View style={{
                        width: '10%',
                        height: '10%',
                        // borderColor:'yellow',
                        // borderWidth:1,
                        position: 'absolute',
                        zIndex: 1,
                        right: '2%',
                        top: '2%',
                    }}>
                        <IconButton
                            icon="close"
                            size={20}
                            iconColor='white'
                            style={{
                                // alignSelf: 'flex-end',
                                backgroundColor: 'gray'
                            }}
                            onPress={() => {
                                let copy = [...attach]
                                copy.splice(index, 1)
                                setAttach(copy)
                            }}
                        />
                    </View>
                }
                {attached}
            </View>
        ))
        return (
            <VerticalList>
                {tagList}
            </VerticalList>
        )
    }
    useEffect(() => {
        setAttachContent(renderAttach());
        if (attach.length == 0) {
            setDeletable(false)
        }
    }, [attach, deletable])
    //use to blur when its complement is pressed.
    const inputRef = useRef<TextInput>(null);
    const removeFocus = () => {
        if (inputRef.current) {
            inputRef.current.blur();
        }
    };
    function addNote() {
        let copy = [...attach]
        copy.push(
            <TouchableWithoutFeedback onPress={removeFocus}>
                <TouchableOpacity
                    style={{
                        borderColor: 'red',
                        borderWidth: 1,
                        padding:'3%'
                    }}
                    onLongPress={() => { console.log("haha") }}
                >
                    <TextInput
                        ref={inputRef}
                        multiline={true}
                        style={{
                            width: '100%',
                            color: 'white',
                            borderColor: 'blue',
                            borderWidth: 1
                        }}
                        placeholder='Add Note'
                        placeholderTextColor={'white'}
                        onFocus={() => { setIsTyping(true) }}
                        onBlur={() => { setIsTyping(false) }}
                    />
                </TouchableOpacity>
            </TouchableWithoutFeedback >
        )
        setAttach(copy)
    }
    let options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    async function openCamera() {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const result = await launchCamera(options)
                if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                    let newImage = result.assets[0].uri
                    addPhoto(newImage)
                }
            }
        } else if (Platform.OS === 'ios') {

            const granted = await request(PERMISSIONS.IOS.CAMERA)
            if (granted === RESULTS.GRANTED) {
                const result = await launchCamera(options)
                if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                    let newImage = result.assets[0].uri
                    addPhoto(newImage)
                }
            }
        }
    }
    async function openGallery() {
        const result = await launchImageLibrary(options)
        if (result.assets !== undefined && result.assets[0].uri !== undefined) {
            let newImage = result.assets[0].uri
            addPhoto(newImage)
        }
    }

    function addPhoto(newImage: string) {
        // let newImage = result.assets[0].uri
        let copy = [...attach]
        copy.push(
            <Swiper
                loop={false}
            >
                <TouchableOpacity
                    onLongPress={() => { setDeletable(true); }}
                    activeOpacity={1}
                    style={{
                        flex: 1
                    }}
                >
                    <Image source={{ uri: newImage }} key={index + 'img'}
                        style={{
                            flex: 1,
                        }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1
                    }}
                    activeOpacity={1}
                    onLongPress={() => { console.log("hi") }}
                >
                    <Image source={{ uri: newImage }} key={index + 'img'}
                        style={{
                            flex: 1,
                        }} />
                </TouchableOpacity>
                <Image source={{ uri: newImage }} key={index + 'img'}
                    style={{
                        flex: 1
                    }} />
            </Swiper>
        )
        setAttach(copy)
        scrollToBottom()
    }
    //when typing, remove the bottom buttons
    const [isTyping, setIsTyping] = useState<boolean>(false)

    //when new component box is attached, scroll down to  the bottom.
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    return (
        <StyledBackgroundView source={background}>
            <SafeArea>
                <TagContainer index={index} />
                <View style={{
                    overflow: 'hidden',
                    flex: 1,
                    borderRadius: 25,
                    // padding: '2%'
                }}>
                    <ScrollView

                        ref={scrollViewRef}
                        alwaysBounceHorizontal={false}
                        alwaysBounceVertical={false}
                        bounces={false} //ios
                        overScrollMode="never"//android
                        style={{
                            flex: 0.8,
                            // borderRadius:25,
                            // overflow:'hidden'
                        }}>
                        {attachContent}
                    </ScrollView>
                </View>
                {/* not display when typing */}
                {((!isTyping && !deletable) || attach.length == 0) &&
                    <FooterContainer >
                        <PaperProvider theme={FABTheme}>
                            <FabContainer>
                                <FabStyle
                                    backdropColor='transparent'
                                    open={isOpen}
                                    visible
                                    icon={isOpen ? 'minus' : 'plus'}
                                    actions={[
                                        {
                                            icon: 'note',
                                            onPress: () => { addNote(); scrollToBottom(); }
                                        },
                                        {
                                            icon: 'camera',
                                            onPress: () => { openCamera(); }
                                        },
                                        {
                                            icon: 'folder-image',
                                            onPress: () => { openGallery(); }
                                        },
                                    ]}
                                    onStateChange={() => { setIsOpen(!isOpen) }}
                                    onPress={() => {
                                        if (isOpen) {
                                            // do something if the speed dial is open
                                        }
                                    }}
                                />
                            </FabContainer>
                        </PaperProvider>
                        <DateContainer>
                            <DiaryDate date={date} />
                        </DateContainer>
                        <NextButtonContainer>
                            <IconButton
                                icon={"chevron-right"}
                                size={50}
                                iconColor='white'
                                onPress={() => { navigation.navigate('ListView') }}
                                style={{
                                    margin: 0,
                                    padding: 0,
                                    // borderColor:'red',
                                    // borderWidth:1,
                                    backgroundColor: 'gray',
                                    alignItems: 'center'
                                }}
                            />
                        </NextButtonContainer>
                    </FooterContainer>
                }
                {(deletable && attach.length != 0) &&
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignSelf: 'center'
                        }}
                        onPress={() => {
                            setDeletable(false)
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 25,
                                borderColor: 'gray',
                                borderWidth: 1,
                                borderRadius: 10,
                                padding: '2%',
                                backgroundColor: 'gray'
                            }}
                        >
                            Done
                        </Text>
                    </TouchableOpacity>
                }
            </SafeArea>
        </StyledBackgroundView >

    );
};
export default DiaryEdit;