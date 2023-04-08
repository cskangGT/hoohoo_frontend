import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { CameraOptions } from 'react-native-image-picker/lib/typescript/types'
import { TouchableHighlight, Image, TextInput, PermissionsAndroid } from 'react-native';
import styled from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
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
// const [photo, setPhoto] = useState<string[]>([])
const photo:string[] = [] 
// const [photoContent, setPhotoContent] = useState<JSX.Element[]>()
let photoContent:JSX.Element[] = []
// const [enableDelete, setEnableDelete] = useState<boolean>(false)
let enableDelete:boolean = false
// const [count, setCount] = useState<number>(0)
let count:number = 0
let options: CameraOptions = {
    saveToPhotos: true,
    mediaType: 'photo'
}
export const openCamera = async () => {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            const result = await launchCamera(options)
            if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                photo.push(result.assets[0].uri)
                // setPhoto(photo)
                // setCount(count + 1)
                // setEnableDelete(false)
                count+=1
                enableDelete = false
                updatePhotoContent()

            }
        }
    } catch (error) {
        console.log(error) // handle error
    }
    // setVisible(false)
    // animationReset()

}
export const openGallery = async () => {
    const result = await launchImageLibrary(options)
    if (result.assets !== undefined && result.assets[0].uri !== undefined) {
        photo.push(result.assets[0].uri)
        // setPhoto(photo)
        count+=1
        enableDelete = false

        // setCount(count + 1)
        // setEnableDelete(false)
        updatePhotoContent()

    }
    return photoContent

    // setVisible(false)
    // animationReset()
    
}
export const deletePhoto = (deletable: boolean, index: number) => {
    if (deletable) {
        // if (enableDelete)
        delete photo[index]
        // setPhoto(photo)
        // setCount(count - 1)
        count-=1
        updatePhotoContent()

        // setEnableDelete(false)
    }
    // setVisible(false)
    // animationReset()
}


//포토에 새로운값이 들어왔다면, 즉각 컨텐츠를 업데이트.
const updatePhotoContent = () => {
    let contentHolder = (
        photo.map((picture: string, index: number) => (
            <TouchableHighlight onPress={() => deletePhoto(enableDelete, index)} key={index}
                style={{
                    margin: 5,
                }}>
                <Image source={{ uri: picture }} key={index} style={{ height: 150, width: 150, borderRadius: 50 }} />
            </TouchableHighlight >
        ))
    )
    // setPhotoContent(contentHolder)
    photoContent = contentHolder
}

export default function PhotoUpload(): JSX.Element {
    // useEffect(() => {
    //     // setEnableDelete(enableDelete)
    //     // setPhoto(photo)
    // })
    // useEffect(() => {
    //     if (enableDelete && count == 0) {
    //         // setEnableDelete(false)
    //         enableDelete= false
    //     }
    //     updatePhotoContent() //새 state 값과 함께 해당지역 새로 만들어주면됨~
    // }, [enableDelete, count])

    //remove pictures
    const toggleDeletePhoto = () => {
        enableDelete = !enableDelete
        // setEnableDelete(!enableDelete)
    }
    return (
        count != 0 ? <Photos content={photoContent as JSX.Element[]}></Photos> : <View ></View>
    )
};
