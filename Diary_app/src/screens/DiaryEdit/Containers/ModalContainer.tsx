import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ScrollView } from "react-native";
// import { Modal } from "react-native-paper";
import { IndividualTagContainer, RemoveIconContainer, TagText, TagZoneSecondRow, VerticalList } from "../styles";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-paper/src/components/Icon'
import { HelperText } from "react-native-paper";
// import Toast from 'react-native-simple-toast';

/**
 * 
 * @param props contains..
 * index : index of diary
 * tags: tags in the diary
 * setTags: used to update tags.
 * @returns 
 */
function ModalContainer(props: any): JSX.Element {
    const navigation = useNavigation();
    let index = props.index

    //scrollview for tags ref
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    //used for the modal text input
    const textInputRef = useRef<TextInput>(null);

    //text in the text input
    const [text, setText] = useState<string>("")

    const [addedTags, setAddedTags] = useState<string[]>([])
    function addNewTags(txt: string) {
        let copy = [...addedTags]
        copy.push(txt)
        setAddedTags(copy)
    }
    function removeTag(target: number) {
        let copy = [...addedTags]
        copy.splice(target, 1)
        setAddedTags(copy)
    }
    function renderTags(): JSX.Element {
        let tagList = addedTags.map((text: string, index: number) => (
            <IndividualTagContainer key={"tagCotainer" + index}>
                <RemoveIconContainer onPress={() => { removeTag(index) }}>
                    <Icon source="close-circle" size={20} color='gray' />
                </RemoveIconContainer>
                <TagText key={"tag" + index}>
                    {text}
                </TagText>
            </IndividualTagContainer>
        ))
        return (
            <VerticalList>
                {tagList}
            </VerticalList>
        )
    }

    const [currCapacity, setCurrCapacity] = useState<number>(props.currentCapability);
    // useEffect(()=>{
    //     setCurrCapacity(props.currentCapability)
    // }, props.currentCapability)
    function checkRegulation(result: string) {
        let limit = props.limit
        let capacity = currCapacity
        if (result !== undefined && result.length < limit && capacity - result.length >= 0) {
            result = result.charAt(0).toUpperCase().concat(result.substring(1, result.length))
            for (let i = 0; i < result.length; i++) {
                let curr = result.charAt(i)
                if (curr == ' ') {
                    let next = result.charAt(i + 1).toUpperCase()
                    result = result.substring(0, i).concat(next + result.substring(i + 2, result.length))
                }
            }
            addNewTags(result);
            setText("")
            setCurrCapacity(currCapacity - result.length)
        } else if (result !== undefined && result.length >= limit) {
            // console.log("length err exceed limit", result.length)
            // Toast.show('Max limit exceeded:\nLength of a tag should be less than ' + limit, {backgroundColor:'red'});
        } else if (result !== undefined && capacity - result.length < 0) {
            // console.log("length err exceed cap", result.length, capacity)
            // Toast.show('Max capacity exceeded:\nYou have recorded more than ' + capacity + ' letters', {backgroundColor:'red'});

        }
    }
    const hasLengthError = () => {
        return ((text !== undefined && text.length >= props.limit))
    };
    const hasCapacityError = () => {
        return (text !== undefined && currCapacity - text.length < 0)
    }
    const [addedTagsContent, setAddedTagsContent] = useState<JSX.Element>(renderTags)
    useEffect(() => {
        setAddedTagsContent(renderTags);
        scrollToBottom()
    }, [addedTags])

    const [isTyping, setIsTyping] = useState<boolean>(false)


    return (
        <Modal
            visible={true}
            transparent={true}
        >
            <View style={{
                width: '100%',
                height: isTyping ? '80%' : '60%',
                backgroundColor: '#222222',
                top: '20%',
                borderRadius: 25,
                padding: '5%',
                bottom: 0,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                    }}>
                        <TagText style={{
                            fontSize: 20
                        }}>
                            Add New Tag
                        </TagText>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            props.setIsModalUp(false)
                            navigation.navigate('TagRecording', { index: { index } });
                        }}
                        style={{
                            alignItems: 'center',
                            position: 'absolute',
                            right: 0,
                            width: '20%',
                        }}>
                        <TagText>
                            Record
                        </TagText>
                    </TouchableOpacity>
                </View>
                <TagZoneSecondRow
                    keyboardShouldPersistTaps="handled"
                    ref={scrollViewRef}
                >
                    {addedTagsContent}
                </TagZoneSecondRow>
                <TouchableWithoutFeedback
                    onPress={() => {
                        textInputRef.current?.blur();
                    }}>
                    <View style={{
                        margin: '3%'

                    }}>
                        <TextInput
                            ref={textInputRef}
                            style={{
                                borderColor: 'white',
                                borderWidth: 1,
                                color: 'white',
                                borderRadius: 10,
                                padding: '3%'
                            }}
                            placeholder="Put your tags"
                            placeholderTextColor={"gray"}
                            value={text}
                            onChangeText={(txt: string) => {
                                setText(txt)
                            }}
                            onSubmitEditing={() => {
                                if (text.length !== 0) {
                                    checkRegulation(text);
                                    // addNewTags(text);
                                    // setText("")
                                }
                            }}
                            blurOnSubmit={false}
                            onFocus={() => { setIsTyping(true) }}
                            onBlur={() => { setIsTyping(false) }}
                        />
                        {
                            hasLengthError() &&
                            <HelperText
                                style={{
                                    color: 'white',
                                    backgroundColor: 'red'
                                }}
                                type="error"
                                visible={hasLengthError()}
                            >
                                {'Max limit exceeded:\nLength of a tag should be less than ' + props.limit}
                            </HelperText>
                        }
                        {
                            (hasCapacityError()) &&
                            <HelperText
                                style={{
                                    color: 'white',
                                    backgroundColor: 'red'
                                }}
                                type="error"
                                visible={hasCapacityError()}
                            >
                                {'Max capacity exceeded:\nYou have recorded more than ' + props.capacity + ' letters'}
                            </HelperText>
                        }

                    </View>
                </TouchableWithoutFeedback>
                {isTyping &&
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end'
                    }}>
                        <TouchableOpacity onPress={() => {
                            textInputRef.current?.blur();
                            setIsTyping(false)
                        }}>
                            <TagText >
                                Cancel
                            </TagText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            if (text.length !== 0) {
                                checkRegulation(text);
                                // addNewTags(text);
                                // setText("")
                            }
                        }}>
                            <TagText>
                                Add
                            </TagText>
                        </TouchableOpacity>
                    </View>
                }
                {!isTyping &&
                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'flex-end'
                    }}>

                        <TouchableOpacity onPress={() => {
                            props.setIsModalUp(false)
                        }}>
                            <TagText >
                                Cancel
                            </TagText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            let copy = [...props.tags]
                            for (let i = 0; i < addedTags.length; i++) {
                                copy.push(addedTags[i])
                            }
                            props.setTags(copy)
                            props.setIsModalUp(false)
                        }}>
                            <TagText>
                                Apply
                            </TagText>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </Modal>
    )
}
export default ModalContainer