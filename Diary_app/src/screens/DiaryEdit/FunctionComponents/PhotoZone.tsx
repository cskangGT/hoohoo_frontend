import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { TouchableHighlight } from 'react-native';
import { countEx, enableDeleteEx, setCountEx, setEnableDeleteEx } from '../DiaryDetail';
import { showPlusButtonEx } from './FunctionComponents';

const icon_camera = require('../FunctionComponents/icons/camera.png');
const icon_gallery = require('../FunctionComponents/icons/gallery.png');


const StyledHorizontallyAlignedItems = styled(View)`
flex-direction: row;
 justify-content: center;
 align-items: center;
 flex:1;

`
// padding-horizontal: 20;

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

const photoWidth: number = 200;
const photoHeight: number = 500;
//this is for the photozone only!
//maxwidth = minwidth =photowidth!
const StyledHorizontalScrollViewOverflow = styled(View)`
overflow:hidden;
display: flex;
border-radius:25;
maxWidth: 200;
minWidth: 200;
maxHeight:500;
minHeight:500;
`
const StyledScrollHorizontalScroll = styled(ScrollView)`
background-color: #666666AA;
border-radius:25;
`
// paddingHorizontal: 5px;
const StyledTextInput = styled(TextInput)`
border-radius: 50;
border-color: white;
border-width: 1;
padding: 15px;
color:white;
`

export let updatePhotoContentEx: any;
export let openCameraEx: any;
export let openGalleryEx: any;
export let deletePhotoEx: any;
function PhotoZone(props: any): JSX.Element {
    let options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    const [photo, setPhoto] = useState<string[]>([])
    const [photoContent, setPhotoContent] = useState<JSX.Element[]>()

    const count = countEx
    const setCount = setCountEx
    const enableDelete = enableDeleteEx
    const setEnableDelete = setEnableDeleteEx
    useEffect(() => {
        setEnableDelete(enableDelete)
        setPhoto(photo)
    })
    const [photoCount, setPhotoCount] = useState<number>(0)
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
                    setPhotoCount(photoCount + 1)
                    // increaseCount()
                    setEnableDelete(false)
                    updatePhotoContent()
                }
            }
        } catch (error) {
            console.log(error) // handle error
        }
    }
    openCameraEx = openCamera
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        if (result.assets !== undefined && result.assets[0].uri !== undefined) {
            photo.push(result.assets[0].uri)
            setPhoto(photo)
            setCount(count + 1)
            setPhotoCount(photoCount + 1)
            // increaseCount()
            setEnableDelete(false)
            updatePhotoContent()

        }
    }
    openGalleryEx = openGallery
    const deletePhoto = (deletable: boolean, index: number) => {
        if (deletable) {
            // if (enableDelete)
            delete photo[index]
            setPhoto(photo)
            setCount(count - 1)
            setPhotoCount(photoCount - 1)
            // decreaseCount()
            updatePhotoContent()

            // setEnableDelete(false)
        }
    }
    deletePhotoEx = deletePhoto

    const [dddContent, setDDDContent] = useState<JSX.Element[]>()
    const [currPage, setCurrPage] = useState<number>(0);


    //포토에 새로운값이 들어왔다면, 즉각 컨텐츠를 업데이트.
    const updatePhotoContent = () => {
        if (photo.length == 0) {
            return
        }
        let contentHolder = (
            photo.map((picture: string, index: number) => (
                <View style={{ position: 'relative', height: '100%' }} key={index + 'imgview'}>
                    <TouchableHighlight onLongPress={() => { setEnableDelete(true); }} key={index + 'imgtouch'}
                    >
                        <Image source={{ uri: picture }} key={index + 'img'}
                            style={{
                                width: photoWidth,
                                height: photoHeight, borderRadius: 25
                            }} />
                    </TouchableHighlight >
                    <View
                        key={index + 'xview'}
                        style={{ position: 'absolute', right: 0 }}>
                        {
                            enableDelete &&
                            //must componentize this. (duplicate code in diaryedit)
                            <TouchableHighlight
                                key={index + 'xtouch'}
                                onPress={() => { deletePhoto(enableDelete, index) }}
                                style={{
                                    borderRadius: 50,
                                    borderColor: 'white',
                                    backgroundColor: 'black',
                                    width: 25,
                                    height: 25,
                                }}>
                                <Text style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}
                                    key={index + 'Xtext'}>
                                    X
                                </Text>
                            </TouchableHighlight>
                        }
                    </View>
                </View>
            ))
        )

        setPhotoContent(contentHolder)

        let newDDD: JSX.Element[] = []
        console.log("count", photoCount)
        for (let i = 0; i < photoCount; i++) {
            newDDD.push(
                <View>
                    <Text>
                        {i}
                    </Text>
                </View>
            )
        }
        let newDDDContent = (
            newDDD.map((dot: JSX.Element, index: number) => (
                <View key={index + 'dot'}>
                    {dot}
                </View>
            ))
        )
        setDDDContent(newDDDContent);
    }
    updatePhotoContentEx = updatePhotoContent

    //remove pictures
    const toggleDeletePhoto = () => {
        setEnableDelete(!enableDelete)
    }

    const [pictureOptionVisible, setPictureOptionVisible] = useState<boolean>(false)
    const scrollViewRef = useRef<ScrollView>(null);


    const handleScroll = (event: any) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        let page: number = Math.floor(offsetX / photoWidth);

        if (offsetX - page * photoWidth > photoWidth / 2) {
            scrollViewRef.current?.scrollTo({ x: (page + 1) * photoWidth, animated: true });
            page = page + 1;
        } else {
            scrollViewRef.current?.scrollTo({ x: page * photoWidth, animated: true });
        }
        setCurrPage(page)
    };
    const pictureAdd = (
        <View style={{
            flex: 1, justifyContent: 'center', alignItems: 'center',
            width: photoWidth,
            height: photoHeight,
            borderWidth: 1,
            borderColor: 'blue'
        }}>
            {!pictureOptionVisible &&
                <View style={{
                    borderColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => { setPictureOptionVisible(true) }}
                        style={{
                            borderRadius: 50,
                            borderColor: 'white',
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 50,
                            height: 50
                        }}>
                        <Text style={{
                            color: 'white',
                        }}>
                            +
                        </Text>
                    </TouchableOpacity>
                    <Text style={{
                        color: 'white',
                    }}>
                        Add a picture
                    </Text>
                </View>
            }
            {pictureOptionVisible &&

                <View style={{
                    borderColor: 'blue'
                }}>
                    <TouchableOpacity
                        onPress={() => { openCameraEx(); setPictureOptionVisible(false); }}>
                        <Image source={icon_camera} key='camera' style={{ height: 50, width: 50, borderRadius: 50 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { openGalleryEx(); setPictureOptionVisible(false); }}>
                        {/* open gallery */}
                        <Image source={icon_gallery} key='gallery' style={{ height: 50, width: 50, borderRadius: 50 }} />
                    </TouchableOpacity>
                </View>
            }
        </View>
    )

    return (
        <View>
            <StyledHorizontalScrollViewOverflow >
                <StyledScrollHorizontalScroll
                    ref={scrollViewRef}
                    pagingEnabled={true}
                    onScroll={handleScroll} horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        photoContent
                    }

                    {pictureAdd}

                </StyledScrollHorizontalScroll>
            </StyledHorizontalScrollViewOverflow >
            {/* dotdotdot */}
            <View style={{
                borderColor: 'red',
                borderWidth: 1,
                position: 'absolute',
                bottom: 10,
                left: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
                {dddContent}
            </View>
        </View >

    );
};
export default PhotoZone;


