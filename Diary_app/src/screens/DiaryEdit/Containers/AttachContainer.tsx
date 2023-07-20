import { useEffect, useRef, useState } from "react";
import data from '../../../data/data.json'
import Icon from 'react-native-paper/src/components/Icon'
import { FlexOneTouchable, FullImage, GrayIconButton, IndividualTagContainer, MiddleButtonContainer, RemoveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, TopRightButtonContainer, VerticalList } from "../styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, Image, TouchableOpacity, View, Text, Platform, PermissionsAndroid } from "react-native";
import { IconButton } from "react-native-paper";
import TextInputContainer from "./TextInputContainer";
import Swiper from "react-native-swiper";
import { CameraOptions, launchCamera, launchImageLibrary } from "react-native-image-picker";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

//props contains..
//index: index of diary:number 
//setType: update current state if keyboard is up or not
//scrollViewRef: update scrollview as new attachment is added.
//setDeletable: update deletable attachment component state.
function AttachContainer(props: any): JSX.Element {
    // let index = props.index;
    //is + button is clicked so there are camera and gallery options are visible on the middle of a photo.
    const [isPhotoOptionOn, setIsPhotoOptionOn] = useState<boolean>(false)

    //remove targeted data from the data and update the result
    function removeTarget(target: number) {
        //WARNING: CURRENTLY ONLY DELETES NOTE COMPONENT.
        // data[index].attach.splice(target, 1)
        let copy = [...props.attach]
        copy.splice(target, 1)
        props.setAttach(copy)
        // props.setAttach([...data[index].attach])
    }
    useEffect(() => {
        setAttachContent(renderAttach);
    }, [props.attach, isPhotoOptionOn, props.deletable])

    function generateGallery(addresses: string[], addressesIndex: number) {
        let images = addresses.map((address: string, i: number) => {
            if (address.length !== 0) {
                return (
                    <View
                        key={address + i + "view"}
                        style={{
                            flex: 1
                        }}
                    >
                        <FlexOneTouchable
                            onLongPress={() => {
                                props.setDeletable(true);
                            }}
                            activeOpacity={1}
                            key={address + i}
                        >
                            {props.deletable && (
                                <MiddleButtonContainer>
                                    <GrayIconButton
                                        key={'delete_single_pic_button_img' + address + i}
                                        icon="minus"
                                        size={100}
                                        iconColor='white'

                                        onPress={() => {
                                            let copy = [...props.attach]
                                            let copyAddresses = [...addresses]
                                            copyAddresses.splice(i, 1);
                                            if (copyAddresses.length === 0) {
                                                copy.splice(addressesIndex, 1);
                                            } else {
                                                copy[addressesIndex] = copyAddresses;
                                            }
                                            props.setAttach(copy);
                                        }}
                                    />
                                </MiddleButtonContainer>
                            )}
                            {isPhotoOptionOn && (
                                <MiddleButtonContainer>
                                    <GrayIconButton
                                        key={'openCamera' + address + i}
                                        icon="camera"
                                        size={100}
                                        iconColor='white'

                                        onPress={() => {
                                            openCamera(addresses, addressesIndex);
                                            setIsPhotoOptionOn(false);
                                        }}
                                    />
                                    <GrayIconButton
                                        key={'openGallery' + address + i}
                                        icon="folder-image"
                                        size={100}
                                        iconColor='white'

                                        onPress={() => {
                                            openGallery(addresses, addressesIndex);
                                            setIsPhotoOptionOn(false);
                                        }}
                                    />
                                </MiddleButtonContainer>
                            )}
                            <FullImage
                                source={{ uri: address }}
                                key={i + 'img'}
                            />
                        </FlexOneTouchable>
                    </View>
                );
            }

        });
        return (
            <Swiper
                key={images.length} //most important thing to update swiper!
                loop={false}
                showsPagination={true}
                index={images.length - 1}
            >
                {images}

            </Swiper>
        )
    }

    let options: CameraOptions = {
        saveToPhotos: true,
        mediaType: 'photo'
    }
    async function openCamera(addresses: string[], addressesIndex: number) {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const result = await launchCamera(options)
                if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                    let newImage = result.assets[0].uri
                    appendPicture(addresses, addressesIndex, newImage)
                }
            }
        } else if (Platform.OS === 'ios') {

            const granted = await request(PERMISSIONS.IOS.CAMERA)
            if (granted === RESULTS.GRANTED) {
                const result = await launchCamera(options)
                if (result.assets !== undefined && result.assets[0].uri !== undefined) {
                    let newImage = result.assets[0].uri
                    appendPicture(addresses, addressesIndex, newImage)
                }
            }
        }
    }
    async function openGallery(addresses: string[], addressesIndex: number) {
        const result = await launchImageLibrary(options)
        if (result.assets !== undefined && result.assets[0].uri !== undefined) {
            let newImage = result.assets[0].uri
            appendPicture(addresses, addressesIndex, newImage)
        }
    }

    //append a new picture to the end of current photo component.
    function appendPicture(addresses: string[], addressesIndex: number, newImage: string) {
        let addressesCopy = [...addresses]
        addressesCopy.push(newImage)
        // addresses.push(newImage)
        let copy = [...props.attach]
        copy[addressesIndex] = addressesCopy
        props.setAttach(copy)
    }
    function renderAttach() {
        function isString(input: any): input is string {
            return typeof input === 'string';
        }
        function isStringArray(input: any): input is string[] {
            return Array.isArray(input) && input.every(item => typeof item === 'string');
        }
        let attachList = props.attach.map((attached: string | string[], currIndex: number) => {
            if (isString(attached) || (isStringArray(attached) && attached.length > 0)) {
                return (< View
                    key={"attached" + currIndex}
                    style={{
                        width: '100%',
                        height: isString(attached) ? undefined : 300,
                        borderRadius: isString(attached) ? 15 : 25,
                        overflow: 'hidden',
                        alignItems: 'center',
                        backgroundColor: isString(attached) ? 'rgba(71, 71, 70,0.4)' : 'transparent',
                        padding: isString(attached) ? '1%' : undefined,
                        marginTop: '1%',
                        marginBottom: '1%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                    }}
                >
                    {
                        props.deletable &&
                        <TopRightButtonContainer >
                            <GrayIconButton
                                key={'delete_button' + currIndex}
                                icon="close"
                                size={20}
                                iconColor='white'
                                onPress={() => {
                                    removeTarget(currIndex);
                                }}
                            />
                        </TopRightButtonContainer>
                    }
                    {
                        (!props.deletable && !isString(attached)) &&
                        <TopRightButtonContainer>
                            <GrayIconButton
                                key={'plus_button' + currIndex}
                                icon={isPhotoOptionOn ? "close" : "plus"}
                                size={20}
                                iconColor='white'
                                onPress={() => {
                                    if (isPhotoOptionOn) {
                                        setIsPhotoOptionOn(false)
                                    } else {
                                        setIsPhotoOptionOn(true)
                                    }
                                    // openCamera(attached, currIndex)

                                }}
                            />
                        </TopRightButtonContainer>
                    }
                    {
                        isString(attached) &&
                        <TextInputContainer
                            setIsTyping={props.setIsTyping}
                            attach={props.attach}
                            noteIndex={currIndex}
                            value={attached}
                            setDeletable={props.setDeletable}
                        />
                    }
                    {
                        (!isString(attached) && (isStringArray(attached))) &&
                        generateGallery(attached as string[], currIndex)
                    }

                </View >)
            }

        })
        return (
            <VerticalList>
                {attachList}
            </VerticalList>
        )
    }
    //state variable that contains Components 
    const [attachContent, setAttachContent] = useState<JSX.Element>(renderAttach);


    return (
        <ScrollView
            keyboardShouldPersistTaps="handled"
            ref={props.scrollViewRef}
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
    )
}
export default AttachContainer

//tried working with a json file.
// import { useEffect, useRef, useState } from "react";
// import data from '../../../data/data.json'
// import Icon from 'react-native-paper/src/components/Icon'
// import { IndividualTagContainer, RemoveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, VerticalList } from "../styles";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";
// import { ScrollView, Image, TouchableOpacity, View, Text } from "react-native";
// import { IconButton } from "react-native-paper";
// import TextInputContainer from "./TextInputContainer";
// import Swiper from "react-native-swiper";

// //props contains..
// //index: index of diary:number
// //setType: update current state if keyboard is up or not
// //scrollViewRef: update scrollview as new attachment is added.
// //setDeletable: update deletable attachment component state.
// function AttachContainer(props: any): JSX.Element {
//     let index = props.index;
//     //remove targeted data from the data and update the result
//     function removeTarget(target: number) {
//         //WARNING: CURRENTLY ONLY DELETES NOTE COMPONENT.
//         data[index].attach.splice(target, 1)
//         props.setAttach([...data[index].attach])
//     }
//     useEffect(() => {
//         setAttachContent(renderAttach());
//     }, [props.attach])

//     function generateGallery(addresses: string[]) {
//         let images = addresses.map((address: string, i: number) => (
//             <TouchableOpacity
//                 onLongPress={() => { props.setDeletable(true); }}
//                 activeOpacity={1}
//                 key={address + index}
//                 style={{
//                     flex: 1
//                 }}
//             >
//                 {props.deletable &&
//                     <View style={{
//                         flex: 1,
//                         position: 'absolute',
//                         left: 0,
//                         right: 0,
//                         top: 0,
//                         bottom: 0,
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         width: '100%',
//                         height: '100%',
//                         zIndex: 1
//                     }}
//                     >
//                         <IconButton
//                             key={'delete_single_pic_button_img' + address + i}
//                             icon="minus"
//                             size={100}
//                             iconColor='white'
//                             style={{
//                                 backgroundColor: 'gray',
//                             }}
//                             onPress={() => {
//                                 addresses.splice(i, 1);
//                                 // removeTarget(currIndex);
//                             }}
//                         />
//                     </View>
//                 }
//                 <Image source={{ uri: address }}
//                     key={index + 'img'}
//                     style={{
//                         width: '100%',
//                         height: '100%',
//                         position: 'absolute'
//                     }}
//                 />
//             </TouchableOpacity>
//         ))
//         return (
//             <Swiper
//                 loop={false}
//                 showsPagination={true}
//             >
//                 {images}
//             </Swiper>
//         )
//     }
//     function renderAttach() {
//         function isString(input: any): input is string {
//             return typeof input === 'string';
//         }
//         function isStringArray(input: any): input is string[] {
//             return Array.isArray(input) && input.every(item => typeof item === 'string');
//         }
//         let attachList = props.attach.map((attached: string | string[], currIndex: number) => (
//             <View
//                 key={"attached" + currIndex}
//                 style={{
//                     width: '100%',
//                     // height: isTouchableWithoutFeedback(attached) ? undefined : 300,
//                     height: isString(attached) ? undefined : 300,
//                     // borderRadius: isTouchableWithoutFeedback(attached) ? 15 : 25,
//                     borderRadius: isString(attached) ? 15 : 25,
//                     overflow: 'hidden',
//                     alignItems: 'center',
//                     // backgroundColor: isTouchableWithoutFeedback(attached) ? 'rgba(71, 71, 70,0.4)' : 'transparent',
//                     backgroundColor: isString(attached) ? 'rgba(71, 71, 70,0.4)' : 'transparent',
//                     // padding: isTouchableWithoutFeedback(attached) ? '1%' : undefined,
//                     padding: isString(attached) ? '1%' : undefined,
//                     marginTop: '1%',
//                     marginBottom: '1%',
//                     justifyContent: 'center',
//                     alignSelf: 'center',
//                 }}
//             >
//                 {props.deletable &&
//                     <View style={{
//                         width: '10%',
//                         height: '10%',
//                         position: 'absolute',
//                         zIndex: 1,
//                         right: '2%',
//                         top: '2%',
//                     }}
//                     >
//                         <IconButton
//                             key={'delete_button' + currIndex}
//                             icon="close"
//                             size={20}
//                             iconColor='white'
//                             style={{
//                                 backgroundColor: 'gray',
//                             }}
//                             onPress={() => {
//                                 removeTarget(currIndex);
//                             }}
//                         />
//                     </View>
//                 }
//                 {(!props.deletable && !isString(attached)) &&
//                     <View style={{
//                         width: '10%',
//                         height: '10%',
//                         position: 'absolute',
//                         zIndex: 1,
//                         right: '2%',
//                         top: '2%',
//                     }}
//                     >
//                         <IconButton
//                             key={'plus_button' + currIndex}
//                             icon="plus"
//                             size={20}
//                             iconColor='white'
//                             style={{
//                                 backgroundColor: 'gray',
//                             }}
//                             onPress={() => {
//                                 removeTarget(currIndex);
//                             }}
//                         />
//                     </View>
//                 }
//                 {
//                     isString(attached) &&
//                     <TextInputContainer
//                         setIsTyping={props.setIsTyping}
//                         index={index}
//                         noteIndex={currIndex}
//                         value={attached}
//                         setDeletable={props.setDeletable}
//                     />
//                 }
//                 {
//                     (!isString(attached) && (isStringArray(attached))) &&
//                     generateGallery(attached as string[])
//                 }

//             </View>
//         ))
//         return (
//             <VerticalList>
//                 {attachList}
//             </VerticalList>
//         )
//     }
//     //state variable that contains Components
//     const [attachContent, setAttachContent] = useState<JSX.Element>(renderAttach);
//     useEffect(() => {
//         setAttachContent(renderAttach())
//     }, [props.deletable])

//     return (
//         <ScrollView
//             ref={props.scrollViewRef}
//             alwaysBounceHorizontal={false}
//             alwaysBounceVertical={false}
//             bounces={false} //ios
//             overScrollMode="never"//android
//             style={{
//                 flex: 0.8,
//                 // borderRadius:25,
//                 // overflow:'hidden'
//             }}>
//             {attachContent}
//         </ScrollView>
//     )
// }
// export default AttachContainer