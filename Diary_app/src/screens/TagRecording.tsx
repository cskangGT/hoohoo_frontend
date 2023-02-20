import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from "react-native";
import styled from 'styled-components';
// import styles from '.././styles'
import msg from '..//data/msg.json'

const StyledButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    `



function WordContainer(content: any & JSX.Element): JSX.Element {
    return (
        <StyledButtonContainer>
            {
                content.content
            }
        </StyledButtonContainer>
    )
}

function TagRecording(): JSX.Element {
    const [inputs, setInputs] = useState<string[]>([])
    const [InputContentHolder, setInputContentHolder] = useState<JSX.Element[]>()
    const [recordedInputs, setRecordedInputs] = useState<string[]>([])
    const [recordedContentHolder, setRecordedContentHolder] = useState<JSX.Element[]>()

    const DeleteContent = (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        delete words[index]
        setWords(words)
        createContent(words, setWords, setWordContent)
    }

    const createContent = (words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>) => {
        let contentHolder = (
            words.map((word: string, index: number) => (
                <Button
                    
                    color={"grey"}
                    key={index}
                    title={word}
                    onPress={() => DeleteContent(index, words, setWords, setWordContent)}
                />
            ))
        )
        setWordContent(contentHolder)
    }

    const recordTags = (deleted: string) => {
        recordedInputs.push(deleted)
        setRecordedInputs(recordedInputs)
        createContent(recordedInputs, setRecordedInputs, setRecordedContentHolder)
    }
    const generateUserInputs = () => {
        let message = msg.message
        message.forEach((word: string, index: number) => {
            addInputs(word)
        })
    }
    const addInputs = (word: string) => {
        inputs.push(word)
        setInputs(inputs)
        createContent(inputs, setInputs, setInputContentHolder)

        let time = 3000
        setTimeout(
            () => {
                while (inputs.length > 0) {
                    let deleted = inputs.shift()
                    if (deleted !== undefined) {
                        recordTags(deleted)
                    }
                }
                setInputs(inputs)
                createContent(inputs, setInputs, setInputContentHolder)
            }
            , time)
    }

    return (
        <View style={{alignItems: 'center'}}>
            <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>
            <Text>Speak to me, I'm listening to you</Text>
            

            <View  style={{width:250, height:100}}>
                <Button
                    title="Record"
                    onPress={generateUserInputs} />
            </View>
            <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
        </View>
    )
}

export default TagRecording

