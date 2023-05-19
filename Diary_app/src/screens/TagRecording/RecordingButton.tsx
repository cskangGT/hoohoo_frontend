import Voice from '@react-native-voice/voice';
import CustomButton from '../../components/common/Button';
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';
import { TouchableHighlight, Text, View, ToastAndroid, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { ChangeModeButton, Mic, MicContainer } from './styles';
const micButton = require('../../assets/microphone.png');
const circileButton = require('../../../src/assets/circleButton.png');
const waterSpread1 = require('../../../src/assets/WaterSpread1.png');
const waterSpread2 = require('../../../src/assets/WaterSpread2.png');


function RecordingButton(props: any): JSX.Element {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState<any>([]);
    const [partialResults, setPartialResults] = useState([]);
    const onSpeechStart = (e: any) => {
        //Invoked when .start() is called without error
        // console.log('onSpeechStart: ', e);
        setStarted('on');
    };

    const onSpeechEnd = (e: any) => {
        //Invoked when SpeechRecognizer stops recognition
        // console.log('onSpeechEnd: ', e);
        setEnd('ended');
        setStarted('');
    };

    const onSpeechError = (e: any) => {
        //Invoked when an error occurs.
        //console.log('onSpeechError: ', e);
        setError(JSON.stringify(e.error));
    };
    const onSpeechPartialResults = (e: any) => {
        //Invoked when any results are computed
        //console.log('onSpeechPartialResults: ', e);
        console.log("e_partial results:", e);

        // setPartialResults(e.value);
    };

    const onSpeechVolumeChanged = (e: any) => {
        //Invoked when pitch that is recognized changed
        //console.log('onSpeechVolumeChanged: ', e);
        setPitch(e.value);
    };
    useEffect(() => {
        //Setting callbacks for the process status
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechError = onSpeechError;
        Voice.onSpeechResults = onSpeechResults;
        // Voice.onSpeechPartialResults = onSpeechPartialResults;
        Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

        return () => {
            //destroy the process after switching the screen
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const cap = 300
    const [capacity, setCapacity] = useState<number>(cap)
    const limit = 30
    let resultArr: string[] = []
    // add user Speech to user input states
    function convertResult(results: string[]): void {
        console.log("results", results);
        let result: string = results[results.length - 1]
        if (result !== undefined && result.length < limit && capacity - result.length >= 0) {
            result = result.charAt(0).toUpperCase().concat(result.substring(1, result.length))
            for (let i = 0; i < result.length; i++) {
                let curr = result.charAt(i)
                if (curr == ' ') {
                    let next = result.charAt(i + 1).toUpperCase()
                    result = result.substring(0, i).concat(next + result.substring(i + 2, result.length))
                    // console.log("next:", next, "result :", result)
                }
            }
            props.addInputs(result)
            setCapacity(capacity - result.length)
        } else if (result !== undefined && result.length >= limit) {
            ToastAndroid.show('Max limit exceeded:\nLength of a tag must be less than ' + limit, ToastAndroid.SHORT);
        } else if (result !== undefined && capacity - result.length < 0) {
            ToastAndroid.show('Max capacity exceeded:\nYou have recorded more than ' + cap + ' letters', ToastAndroid.SHORT);
        }
    }
    const onSpeechResults = (e: any) => {
        //Invoked when SpeechRecognizer is finished recognizing
        setTimeout(() => {
            destroyRecognizer();
            resultArr.push(e.value[0])
            console.log("e:", resultArr);
        }, 2000)
        setTimeout(() => {
            convertResult(resultArr)
            resultArr = []
        }, 3000)
    };
    const startRecognizing = async () => {
        //Starts listening for speech for a specific locale
        if (started != 'on') {
            try {
                console.log("Start Recognizing");
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
            setStarted('');
            setEnd('');
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
            console.log("Destory Recognizing");
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
                        }}
                    >
                        <TouchableOpacity
                            onPress={startRecognizing}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                backgroundColor: 'gray',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                // borderColor:'red',
                                // borderWidth:1

                            }}>
                            {/* <Mic source={micButton} /> */}
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center'
                                }}
                            >MIC</Text>
                        </TouchableOpacity>
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

{/* <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
            {
                started ?
                    (<TouchableHighlight
                        onPress={destroyRecognizer}
                        activeOpacity={0.7}
                        underlayColor='transparent'
                    >
                        <Mic source={microButton} />
                    </TouchableHighlight>)
                    :
                    (<TouchableHighlight
                        style={{

                        }}
                        onPress={startRecognizing}
                        activeOpacity={0.7}
                        underlayColor='transparent'
                    >
                        <Mic source={microButton} />
                    </TouchableHighlight>)
            }

        </View> */}