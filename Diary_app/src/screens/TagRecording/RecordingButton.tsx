import Voice from '@react-native-voice/voice';
import React, { useEffect, useState } from 'react'
import { TouchableHighlight, Text, View, TouchableOpacity } from 'react-native';
import { ChangeModeButton, MicContainer } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
const circileButton = require('../../../src/assets/circleButton.png');

function RecordingButton(props: any): JSX.Element {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState<any>([]);
    const [partialResults, setPartialResults] = useState([]);
    const onSpeechStart = (e: any) => {
        setStarted('on');
    };
    const onSpeechEnd = (e: any) => {
        setEnd('ended');
        setStarted('');
    };
    const onSpeechError = (e: any) => {
        setError(JSON.stringify(e.error));
    };
    const onSpeechVolumeChanged = (e: any) => {
        // Invoked when pitch that is recognized changed
        setPitch(e.value);
    };
    useEffect(() => {
        //Setting callbacks for the process status
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
        return () => {
            // destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const [isRecording, setIsRecording] = useState<boolean>(false)
    let resultArr: string[] = []
    // add user Speech to user input states
    function convertResult(results: string[]): void {
        let result: string = results[results.length - 1]
        props.checkRegulation(result)
    }
    const onSpeechResults = (e: any) => {
        // Invoked when SpeechRecognizer is finished recognizing
        setTimeout(() => {
            destroyRecognizer();
            resultArr.push(e.value[0])
        }, 2000)
        setTimeout(() => {
            convertResult(resultArr)
            resultArr = []
        }, 3000)
    };
    const startRecognizing = async () => {
        // Starts listening for speech for a specific locale
        if (started != 'on') {
            try {
                setIsRecording(true)
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
            setIsRecording(false)
        } catch (e) {
            //eslint-disable-next-line
            console.error(e);
        }
    };

    function changeMode() {
        props.setIsTextMode(!props.isTextMode);
        props.fadeInFadeOut();
    }

    return (
        <MicContainer>
            {/* <FadeInOutText text={"tq"} /> */}
            {props.isTextMode && //text mode only displays the mode change double circle button
                <TouchableOpacity onPress={changeMode}>
                    <ChangeModeButton source={circileButton} />
                </TouchableOpacity>
            }
            {
                !props.isTextMode && //speech mode displays the mic button and text mode button
                <View>
                    <View
                        style={{
                            flex: 1, justifyContent: 'flex-start',
                        }}>
                        {
                            isRecording ? // is currently recoridng 
                                (<TouchableHighlight
                                    onPress={destroyRecognizer}
                                    activeOpacity={0.7}
                                    underlayColor='transparent'
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                    }}
                                >
                                    <Icon name="mic-circle-outline" color={'#fcf5f5'} size={50} />
                                </TouchableHighlight>)
                                :
                                (<TouchableHighlight //currently not recording
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                    }}
                                    onPress={startRecognizing}
                                    activeOpacity={0.7}
                                    underlayColor='transparent'
                                >
                                    <Icon name="mic-circle" color={'#fcf5f5'} size={50} />
                                </TouchableHighlight>)
                        }
                    </View>
                    <TouchableOpacity
                        style={{ flex: 1, justifyContent: 'center' }}
                        onPress={changeMode}>
                        <Text style={{
                            color: 'gray'
                        }}>
                            Text Mode
                        </Text>
                    </TouchableOpacity>
                </View>
            }
        </MicContainer>
    )
}
export default RecordingButton