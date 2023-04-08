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

export let updatePhotoContentEx: any;
export let openCameraEx:any;
export let openGalleryEx:any;
export let deletePhotoEx:any;
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
    }
    openCameraEx = openCamera
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
    }
    openGalleryEx = openGallery
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
    }
    deletePhotoEx = deletePhoto

    //포토에 새로운값이 들어왔다면, 즉각 컨텐츠를 업데이트.
    const updatePhotoContent = () => {
        let contentHolder = (
            photo.map((picture: string, index: number) => (
                <View style={{ position: 'relative' }}>
                    <TouchableHighlight onLongPress={() => {setEnableDelete(true);showPlusButtonEx(false)}} key={index}
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
    updatePhotoContentEx = updatePhotoContent

    //remove pictures
    const toggleDeletePhoto = () => {
        setEnableDelete(!enableDelete)
    }

    return (
        <StyledHorizontalScrollViewOverflow >
            <StyledScrollHorizontalScroll horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                    photoContent
                }
            </StyledScrollHorizontalScroll>
        </StyledHorizontalScrollViewOverflow>

    );
};
export default PhotoZone;


