import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Pressable, Keyboard } from "react-native";
import styled from 'styled-components';
// import styles from '.././styles'
import msg from '../../data/msg.json'
// import * as speech from './speechUtils';
import Voice from '@react-native-voice/voice';
import CustomButton from '../../components/common/Button';
const StyledButtonContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    `
// justify-content: center;
// align-items: center; �ؿ� �ʿ信���� �¿� ���ϼ� 
const StyledModifyContainer = styled(View)`
   
    border-width: 1;
    width: 100%;
    border-color: grey;
    `
const StyledModifyButton = styled(TouchableOpacity)`
    border-width: 1;
    border-color: white;
    border-radius: 50;    
    background-color: pink;
    padding: 10px;
    width:80px;
    justify-content: center;
    align-items: center;
    `
const StyledModifyText = styled(Text)`
    color: white;
    `

let stop : boolean = false;
let pr : any = null;

function ModifyContainer(props: any & string): JSX.Element {
    return (
        <StyledModifyContainer >
            <StyledModifyButton>
                <StyledModifyText>
                    {props.text}
                </StyledModifyText>
            </StyledModifyButton>
        </StyledModifyContainer>
    )
}
function WordContainer(content: any & JSX.Element): JSX.Element {
    return (
        <StyledButtonContainer>
            {
                content.content
            }
        </StyledButtonContainer>
    )
}

function UserTextInput(props: any): JSX.Element {
    //focus if current mode is type mode which contains Speech Mode button
    let focus = (props.currTypeButton === "Speech Mode")
    return (

        <TextInput
            style={{ height: 100, width: '100%', borderWidth: 1, padding: 10 }}
            onFocus={() => {
                if (props.currTypeButton === "Type Mode") {
                    props.switchMode()
                }
            }
            }
            pointerEvents="none"
            ref={props.focusOnInput}
            onChangeText={(text: string) => props.onChangeText(text)}
            value={props.textInput}
            fontSize={44}px
            autoFocus={focus}
            blurOnSubmit={false} //disable dismissing keyboard panel automatically!
            onSubmitEditing={() => {
                props.recordTags(props.textInput as string); //reuse previosuly made function for STT input!
                props.setTextInput("");
            }} />

    );
}
function ModeContentComponents(props: any): JSX.Element {
    return (
        <View style={{ width: '100%' }}>
            <UserTextInput
                textInput={props.textInput} onChangeText={props.onChangeText} recordTags={props.recordTags}
                setTextInput={props.setTextInput} currTypeButton={props.currTypeButton} switchMode={props.switchMode}
                focusOnInput={props.focusOnInput}
            ></UserTextInput>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                width: '100%',
            }}>
                <Button
                    style={{
                        textAlign: 'left',
                        borderWidth: 1,
                        borderColor: 'orange',
                        borderRadius: 50,
                        padding: 10,
                        backgroundColor: 'transparent',
                        margin: 5
                    }}
                    color='orange'
                    title={props.currTypeButton}
                    onPress={props.switchMode} />
            </View>
        </View>
    )
}
function ModeContentContainer(props: any): JSX.Element {
    return (
        <View style={{ width: '100%' }}>
            {props.content}
        </View>)
}




function TagRecording(): JSX.Element {

    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
    const [partialResults, setPartialResults] = useState([]);
    const onSpeechStart = (e) => {
        //Invoked when .start() is called without error
        console.log('onSpeechStart: ', e);
        setStarted('on');
    };

    const onSpeechEnd = (e) => {
        //Invoked when SpeechRecognizer stops recognition
        console.log('onSpeechEnd: ', e);
        setEnd('ended');
        setStarted('');
    };

    const onSpeechError = (e) => {
        //Invoked when an error occurs.
        console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };

    const onSpeechResults = (e) => {
        //Invoked when SpeechRecognizer is finished recognizing
        console.log('onSpeechResults: ', e);
        setResults(e.value);
    };

    const onSpeechPartialResults = (e) => {
        //Invoked when any results are computed
        console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e) => {
        //Invoked when pitch that is recognized changed
        console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };
    useEffect(() => {
        //Setting callbacks for the process status
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
        //destroy the process after switching the screen
        Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);
    

    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        if (started != 'on') {
            try {
            await Voice.start('en-US');
            setPitch('');
            setError('');
            setStarted('');
            setResults([]);
            setPartialResults([]);
            setEnd('');
            } catch (e) {
            //eslint-disable-next-line
            console.error(e);
            }
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
        await Voice.stop();
        } catch (e) {
        //eslint-disable-next-line
        console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        // Cancels the speech recognition
        try {
        await Voice.cancel();
        } catch (e) {
            // eslint-disable-next-line
            console.error(e);
        }
    };

    const destroyRecognizer = async () => {
        //Destroys the current SpeechRecognizer instance
        try {
        await Voice.destroy();
        setPitch('');
        setError('');
        setStarted('');
        setResults([]);
        setPartialResults([]);
        setEnd('');
        } catch (e) {
        //eslint-disable-next-line
        console.error(e);
        }
    };
    
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
                // <View style={{ backgroundColor: 'transparent' }}>
                <TouchableOpacity
                    style= {{
                        borderWidth: 1,
                        borderColor: 'orange',
                        borderRadius: 50,
                        padding: 10,
                        backgroundColor: 'transparent',
                        margin: 5
                    }}
                    key={index}
                    onPress={() => DeleteContent(index, words, setWords, setWordContent)}
                >
                    <Text style={{ color: 'black' }}>{word}</Text>

                </TouchableOpacity>
                // </View>

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


    //TextMode
    const [textInput, setTextInput] = useState<string>()
    const onChangeText = (text: string) => {
        setTextInput(text)
    }

    //switch mode state
    const [currTypeButton, setCurrTypeButton] = useState<string>("Type Mode")
    const focusOnInput = useRef<TextInput>(null)
    const switchMode = () => {
        if (currTypeButton === "Type Mode") {
            focusOnInput.current?.focus();
            setCurrTypeButton("Speech Mode")
        } else {
            setCurrTypeButton("Type Mode")
            Keyboard.dismiss()
        }
        // updateModeConent()
    }
    useEffect(() => {
        updateModeConent()
    }, [currTypeButton])

    const [modeContent, setModeContent] = useState<JSX.Element>(
        <ModeContentComponents
            textInput={textInput}
            onChangeText={onChangeText}
            recordTags={recordTags}
            setTextInput={setTextInput}
            currTypeButton={currTypeButton}
            switchMode={switchMode}
            focusOnInput={focusOnInput}
        />
    )
    const updateModeConent = () => {
        let ModeContentHolder = (
            <ModeContentComponents
                textInput={textInput}
                onChangeText={onChangeText}
                recordTags={recordTags}
                setTextInput={setTextInput}
                currTypeButton={currTypeButton}
                switchMode={switchMode}
                focusOnInput={focusOnInput}
            />
        )
        setModeContent(ModeContentHolder)
    }
    return (
        <View style={{ alignItems: 'center', backgroundColor: 'yellow' }}>
            <ModifyContainer text="Save" />
            <ModifyContainer text="Edit" />

            <WordContainer content={recordedContentHolder as JSX.Element[]}></WordContainer>

            {/* if currTypeButton === speech mode, it is currenlty Type mode so that by clicking that button it switches to speech mode */}
            {/* The Type mode has Speech mode button and text input for user keyboard input. */}
            {/* {currTypeButton === "Speech Mode" &&
                
            } */}
            <ModeContentContainer content={modeContent as JSX.Element} />

            {/* The speech mode has Type mode button, text input for cursor blinking only, and record button at the bottom. */}

            {currTypeButton === "Type Mode" &&
                <View style={{ width: '100%' }}>

                    {/* operate STT  */}
                    <Button
                        title="Record"
                        onPress={startRecognizing}
                         /> 
                         {results.map((result, index) => {
                            console.log(result);
                            return (
                            <Text
                                key={`result-${index}`}>
                                {result}
                            </Text>
                            );})}
                    <CustomButton
                        title="Destroy rec"
                        onPress={destroyRecognizer}
                        backgroundColor='rgb(255, 227, 180)'/>
                </View>
            }

            {/* swtich mode button. 
            Todo: ���� ���̸� 100%�� �ؼ� ȭ���� �� ä���, �� ��ư�� ������Ʈȭ�ؼ� �� ���ȿ� ����.
            */}

            <WordContainer content={InputContentHolder as JSX.Element[]}></WordContainer>
        </View>
    )
}

export default TagRecording

