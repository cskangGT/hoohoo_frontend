import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import msg from '../../data/msg.json'
import { Button } from 'react-native/Libraries/Components/Button';
import { TouchableHighlight } from 'react-native-gesture-handler';

function TagDataContentContainer(props: any & JSX.Element): JSX.Element {
    return (
        <View
            style={{
                flexDirection: 'row',
                // justifyContent: 'space-between',
                alignItems: 'center'
            }}>
            {props.content}
        </View>
    )
}
function Diary(): JSX.Element {
    const [tagData, setTagData] = useState<string[]>([])
    const [tagDataContent, setTagDataContent] = useState<JSX.Element[]>([])
    const updateTagDataContent = (words: string[]) => {
        let container = (
            words.map((word: string, index: number) => (
                <Text
                    style={{
                        flex: 1,
                        // alignItems: index ? 'flex-start': 'flex-end',
                        top: index * 20,
                        right: Math.pow(-1, index) * 5 + 60
                    }}
                >{word}</Text>

            )))
        setTagDataContent(container)
    }
    const generateTags = () => {
        // console.log("hahah")
        let message = msg.message
        message.forEach((word: string, index: number) => {
            tagData.push(word)
        })
        console.log("enter", message)
        setTagData(tagData)
        updateTagDataContent(tagData)
    }

    return (
        <View
            style={{
                flex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: 'black',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    overflow: 'hidden',
                }}
            >
                <View>
                    <TouchableOpacity onPress={generateTags}>
                        <Text>Pressme</Text>
                    </TouchableOpacity>
                    <Text>hahah</Text>
                    <TagDataContentContainer content={tagDataContent}></TagDataContentContainer>
                </View>
            </View>
        </View>
    )


}
export default Diary;
