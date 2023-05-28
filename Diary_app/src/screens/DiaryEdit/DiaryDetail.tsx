import { View, ScrollView, ImageBackground, Text, Dimensions, TouchableOpacity, FlatList, TextInput, Image, Button, TouchableWithoutFeedback, Platform, PermissionsAndroid, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { SafeArea, SmallIconContainer, StyledBackgroundView, IndividualTagContainer, TagZoneContainer, TagZoneFirstRow, TagText, TagZoneSecondRow, VerticalList, RemoveIconContainer, RemoveIcon, FooterContainer, FABTheme, FabContainer, DateContainer, NextButtonContainer, FabStyle, MajorityView, DoneText } from './styles';
import data from '../../data/data.json'
import Icon from 'react-native-paper/src/components/Icon'
import { FAB, Portal, PaperProvider, DefaultTheme, IconButton } from 'react-native-paper';
import DiaryDate from './DiaryDate';
import Swiper from 'react-native-swiper'
import TagContainer from './Containers/TagContainer';
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import TextInputContainer from './Containers/TextInputContainer';
import AttachContainer from './Containers/AttachContainer';
import ModalContainer from './Containers/ModalContainer';

const background = require('../../assets/DiaryEditPage/Background.png');
function DiaryEdit(route: any): JSX.Element {
    const navigation = useNavigation();
    let index: number = parseInt(route.route.params.index)
    let date = data[index].date
    //is the FAB open or not
    const [isOpen, setIsOpen] = useState<boolean>(false)

    type NotesOrImgAddressArray = Array<string | string[]>;
    let attachment: NotesOrImgAddressArray = data[index].attach
    //state that have data at the json file
    const [attach, setAttach] = useState<NotesOrImgAddressArray>(attachment);//add img address[].
    // const [deletable, setDeletable] = useState<boolean>(true)//temporarily true...
    const [deletable, setDeletable] = useState<boolean>(false)//temporarily true...
    function addNote() {
        let copy = [...attach]
        copy.push("")
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
        // data[index].note.push([newImage])
        let copy = [...attach]
        //need to save current image address in our server. 
        copy.push(
            //suppose to work with this code
            [
                newImage,
            ]
        )
        setAttach(copy)
        scrollToBottom()

        // SaveJson(index, copy)
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
    const [attachContent, setAttachContent] = useState<JSX.Element>(
        <AttachContainer
            setIsTyping={setIsTyping}
            scrollViewRef={scrollViewRef}
            attach={attach}
            setAttach={setAttach}
            deletable={deletable}
            setDeletable={setDeletable}
        />
    )
    useEffect(() => {
        setAttachContent(
            <AttachContainer
                setIsTyping={setIsTyping}
                scrollViewRef={scrollViewRef}
                attach={attach}
                setAttach={setAttach}
                deletable={deletable}
                setDeletable={setDeletable}
            />
        )
        if (attach.length == 0) {
            setDeletable(false)
        }
    }, [attach, deletable])

    const capacity = 300 
    const limit = 30 //per a tag 
    const [tags, setTags] = useState<string[]>(data[index].tags)
    
    //decrease capability as many as letters of saved tags.
    function getCurrentCapability(){
        let total = capacity
        for(let i = 0; i < tags.length ; i++){
          total-= tags[i].length
        }
        return total
    }
    
    const [currentCapability, setCurrentCapability] = useState<number>(getCurrentCapability())

    //Used to open/close modal for adding tags
    const [isModalUp, setIsModalUp] = useState<boolean>(false)

    const [tagContainer, setTagContainer] = useState<JSX.Element>(
        <TagContainer
            tags={tags}
            setTags={setTags}
            index={index}
            setIsModalUp={setIsModalUp}
        />)
    useEffect(() => {
        setCurrentCapability(getCurrentCapability())
        setTagContainer(
            <TagContainer
                tags={tags}
                setTags={setTags}
                index={index}
                setIsModalUp={setIsModalUp}
                currentCapability={currentCapability}
                
            />
        )
        //update current capcity. 
    }, [tags])

    return (
        <StyledBackgroundView source={background}>
            <SafeArea>
                {tagContainer}
                <MajorityView >
                    {attachContent}
                </MajorityView>
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
                        <DoneText>
                            Done
                        </DoneText>
                    </TouchableOpacity>
                }
                {isModalUp &&
                    <ModalContainer
                        index={index}
                        tags={tags}
                        setTags={setTags}
                        setIsModalUp={setIsModalUp}
                        currentCapability = {currentCapability}
                        limit = {limit}
                    />
                }

            </SafeArea >
        </StyledBackgroundView >

    );
};
export default DiaryEdit;

