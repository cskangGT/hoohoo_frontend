import Voice from '@react-native-voice/voice';
import CustomButton from '../../components/common/Button';
import React, { useEffect, useRef, useState } from 'react'
import { TouchableHighlight, Text, View } from 'react-native';


let stop: boolean = false;
let pr: any = null;

function RecordingButton(props: any): JSX.Element {
    const [pitch, setPitch] = useState('');
    const [error, setError] = useState('');
    const [end, setEnd] = useState('');
    const [started, setStarted] = useState('');
    const [results, setResults] = useState([]);
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

    const onSpeechResults = (e: any) => {
        //Invoked when SpeechRecognizer is finished recognizing
        //console.log('onSpeechResults: ', e);
        setResults(e.value);
    };

    const onSpeechPartialResults = (e: any) => {
        //Invoked when any results are computed
        //console.log('onSpeechPartialResults: ', e);
        setPartialResults(e.value);
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
                // console.error(e);
            }
        }
    };

    const stopRecognizing = async () => {
        //Stops listening for speech
        try {
            await Voice.stop();

        } catch (e) {
            //eslint-disable-next-line
            //console.error(e);
        }
    };

    const cancelRecognizing = async () => {
        // Cancels the speech recognition
        try {
            await Voice.cancel();
        } catch (e) {
            // eslint-disable-next-line
            //console.error(e);
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
            //console.error(e);
        }
    };
    // add user Speech to user input states
    useEffect(() => {
        if (results[0] !== undefined) {
            props.addInputs(results[0])
        }
    }, [results])
    return (
        <View>
            {/* operate STT  */}
            <TouchableHighlight
                style={{
                    backgroundColor: started ? 'red' : 'rgb(000,220,020)',
                    padding: 20,
                    borderRadius: 10,
                }}
                onPress={startRecognizing}
            >
                <Text>{started ? 'Recording' : 'Record'}</Text>
            </TouchableHighlight>
        </View>
    )
}
export default RecordingButton