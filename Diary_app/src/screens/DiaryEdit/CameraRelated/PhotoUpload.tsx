import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { CameraOptions } from 'react-native-image-picker/lib/typescript/types'
import { TouchableHighlight, Image, TextInput, PermissionsAndroid } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
    font-size: 25px;
    border-width: 1px;
    width: 50px;
    text-align:center;
    border-radius:50px;
    border-color:white;
    background-color:white;
    margin:5px;
    padding:5px;
`;

function Photos(props: any & JSX.Element): JSX.Element {
    return (
        <ScrollView horizontal={true}>
            {
                props.content
            }
        </ScrollView>
    )
}

function PhotoUpload(): JSX.Element {
    let options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    const [photo, setPhoto] = useState<string[]>([])
    const [photoContent, setPhotoContent] = useState<JSX.Element[]>()

    const [enableDelete, setEnableDelete] = useState<boolean>(false)
    const [count, setCount] = useState<number>(0)
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
                    setEnableDelete(false)
                    updatePhotoContent()
                }
            }
        } catch (error) {
            console.log(error) // handle error
        }
    }
    const openGallery = async () => {
        const result = await launchImageLibrary(options)
        if (result.assets !== undefined && result.assets[0].uri !== undefined) {
            photo.push(result.assets[0].uri)
            setPhoto(photo)
            setCount(count + 1)
            setEnableDelete(false)
            updatePhotoContent()

        }
    }
    const deletePhoto = (deletable: boolean, index: number) => {
        if (deletable) {
            // if (enableDelete)
            delete photo[index]
            setPhoto(photo)
            setCount(count - 1)
            updatePhotoContent()

            // setEnableDelete(false)
        }

    }
    useEffect(() => {
        if (enableDelete && count == 0) {
            setEnableDelete(false)
        }
        updatePhotoContent() //새 state 값과 함께 해당지역 새로 만들어주면됨~
    }, [enableDelete, count])

    //포토에 새로운값이 들어왔다면, 즉각 컨텐츠를 업데이트.
    const updatePhotoContent = () => {
        let contentHolder = (
            photo.map((picture: string, index: number) => (
                <TouchableHighlight onPress={() => deletePhoto(enableDelete, index)} key={index}
                    style={{
                        margin: 5,

                    }}>
                    <Image source={{ uri: picture }} key={index} style={{ height: 250, width: 250, borderRadius: 50 }} />
                </TouchableHighlight >
            ))
        )

        setPhotoContent(contentHolder)
    }
    const toggleDeletePhoto = () => {
        setEnableDelete(!enableDelete)
    }
    return (

        <View >
            <View style={{ flexDirection: 'row', borderWidth: 1 }}>
                <TouchableOpacity onPress={openCamera}>
                    {/* open camera  */}
                    {/* &#x1F4F7; is the unicode for camera emoji */}
                    <StyledText>
                        &#x1F4F7;
                    </StyledText>
                </TouchableOpacity>
                <TouchableOpacity onPress={openGallery}>
                    {/* open gallery */}
                    <StyledText>
                        &#128444;
                    </StyledText>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDeletePhoto}>
                    {/* remove picture */}
                    <StyledText>
                        &#128465;
                    </StyledText>
                </TouchableOpacity>
            </View>

            <Photos content={photoContent as JSX.Element[]}></Photos>
        </View>
    )
};

export default PhotoUpload;
function setCameraPhoto(url: any) {
    throw new Error('Function not implemented.');
}