import React, { useEffect, useState } from "react";
import { FlexOneTouchable, FullImage, GrayIconButton, MiddleButtonContainer, TopRightButtonContainer, VerticalList } from "../styles";
import { ScrollView, View, Platform, PermissionsAndroid } from "react-native";
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
    //is + button is clicked so there are camera and gallery options are visible on the middle of a photo.
    const [isPhotoOptionOn, setIsPhotoOptionOn] = useState<boolean>(false)

    //remove targeted data from the data and update the result
    function removeTarget(target: number) {
        let copy = [...props.attach]
        copy.splice(target, 1)
        props.setAttach(copy)
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
                return (<View
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
                flex: 0.8
            }}>
            {attachContent}
        </ScrollView>
    )
}
export default AttachContainer