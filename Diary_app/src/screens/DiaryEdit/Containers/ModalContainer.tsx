import React, { useEffect, useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Modal, ScrollView } from "react-native";
// import { Modal } from "react-native-paper";
import { IndividualTagContainer, RemoveIconContainer, TagText, TagZoneSecondRow, VerticalList } from "../styles";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-paper/src/components/Icon'
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
    const [addedTagsContent, setAddedTagsContent] = useState<JSX.Element>(renderTags)
    useEffect(() => {
        setAddedTagsContent(renderTags);
        scrollToBottom()
    }, [addedTags])
    return (
        <Modal
            visible={true}
            transparent={true}
        >
            <View style={{
                width: '100%',
                height: '60%',
                borderColor: 'red',
                borderWidth: 1,
                backgroundColor: '#222222',
                top: '40%',
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
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
                    ref={scrollViewRef}
                >
                    {addedTagsContent}
                </TagZoneSecondRow>
                <TouchableWithoutFeedback
                    onPress={() => {
                        textInputRef.current?.blur();
                    }}>
                    <View style={{ flex: 1 }}>
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
                                if (txt.length !== 0) {
                                    setText(txt)
                                }
                            }}
                            onSubmitEditing={() => {
                                if (text.length !== 0) {
                                    addNewTags(text);
                                    setText("")
                                }
                            }}
                            blurOnSubmit ={false}
                        />
                    </View>
                </TouchableWithoutFeedback>
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
            </View>
        </Modal>
    )
}
export default ModalContainer