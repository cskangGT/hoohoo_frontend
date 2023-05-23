import { useEffect, useState } from "react";
import data from '../../../data/data.json'
import Icon from 'react-native-paper/src/components/Icon'
import { IndividualTagContainer, RemoveIconContainer, SmallIconContainer, TagText, TagZoneContainer, TagZoneFirstRow, TagZoneSecondRow, VerticalList } from "../styles";
import React from "react";
import { useNavigation } from "@react-navigation/native";

//props contains..
//index: index of diary:number 
function TagContainer(props:any): JSX.Element {
    const navigation = useNavigation();
    let index = props.index;
    //state that have data at the json file
    const [tags, setTags] = useState<string[]>(data[index].tags);
    //remove targeted data from the data and update the result
    function removeTag(target: number) {
        data[index].tags.splice(target, 1)
        setTags([...data[index].tags])
    }
    useEffect(() => {
        setTagContent(renderTags());
    }, [tags])
    function renderTags(): JSX.Element {
        let tagList = tags.map((text, index) => (
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
    //state variable that contains Components 
    const [tagContent, setTagContent] = useState<JSX.Element>(renderTags);
    return (
        <TagZoneContainer>
            <TagZoneFirstRow>
                <SmallIconContainer onPress={() => {
                    navigation.navigate('Diary', { index: { index } })
                }}>
                    <Icon source="eye" size={25} color='gray' />
                </SmallIconContainer>
                <SmallIconContainer onPress={() => {
                    navigation.navigate('TagRecording', { index: { index } })
                }}>
                    <Icon source="microphone" size={25} color='gray' />
                </SmallIconContainer>
            </TagZoneFirstRow>
            <TagZoneSecondRow>
                {tagContent}
            </TagZoneSecondRow>
        </TagZoneContainer>
    )
}
export default TagContainer