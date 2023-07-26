import { useEffect, useRef, useState } from "react";
import Icon from 'react-native-paper/src/components/Icon'
import { EmptyTags, IndividualTagContainer, RemoveIconContainer, UnactiveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, VerticalList } from "../styles";
import React from "react";
import { ScrollView, View } from "react-native"
import { useNavigation } from "@react-navigation/native";

//props contains..
//index: index of diary:number 
function TagContainer(props: any): JSX.Element {
    const navigation = useNavigation();

    //when new component box is attached, scroll down to  the bottom.
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollToBottom = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    };
    //state that have data at the json file
    //remove targeted data from the data and update the result
    function removeTag(target: number) {
        let copy = [...props.tags]
        copy.splice(target, 1)
        props.setTags(copy)
    }
    useEffect(() => {
        setTagContent(renderTags());
        scrollToBottom();
    }, [props.tags])
    function renderTags(): JSX.Element {
        let tagList = props.tags.map((text: string, index: number) => (
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

                {
                    props.tags.length !== 0 ? tagList :
                        <EmptyTags>No Tags</EmptyTags>
                }
            </VerticalList>
        )
    }
    let index: number = props.index
    //state variable that contains Components 
    const [tagContent, setTagContent] = useState<JSX.Element>(renderTags);
    return (
        <TagZoneContainer>
            <TagZoneFirstRow>
                {
                    props.tags.length !== 0 ? <SmallIconContainer onPress={() => {
                        navigation.navigate("Diary", { index: index })
                    }}>
                        <Icon source="eye" size={25} color='gray' />
                    </SmallIconContainer> : <UnactiveIconContainer>
                        <Icon source="eye-off" size={25} color='gray' />
                    </UnactiveIconContainer>
                }
                <SmallIconContainer onPress={() => {
                    props.setIsModalUp(true)
                }}>
                    <Icon source="plus" size={25} color='gray' />
                </SmallIconContainer>
            </TagZoneFirstRow>
            <TagZoneSecondRow
                keyboardShouldPersistTaps="handled"
                ref={scrollViewRef}
            >
                {tagContent}
            </TagZoneSecondRow>

        </TagZoneContainer>
    )
}
export default TagContainer