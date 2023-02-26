// import Voice from 'react-native-voice';
// import React, {useState, useEffect} from 'react';

// const [pitch, setPitch] = useState('');
// const [error, setError] = useState('');
// const [end, setEnd] = useState('');
// const [started, setStarted] = useState('');
// const [results, setResults] = useState([]);
// const [partialResults, setPartialResults] = useState([]);
// const onSpeechStart = (e) => {
//     //Invoked when .start() is called without error
//     console.log('onSpeechStart: ', e);
//     setStarted('√');
//   };

// const onSpeechEnd = (e) => {
//     //Invoked when SpeechRecognizer stops recognition
//     console.log('onSpeechEnd: ', e);
//     setEnd('√');
//   };

// const onSpeechError = (e) => {
//     //Invoked when an error occurs.
//     console.log('onSpeechError: ', e);
//     setError(JSON.stringify(e.error));
//   };

// const onSpeechResults = (e) => {
//     //Invoked when SpeechRecognizer is finished recognizing
//     console.log('onSpeechResults: ', e);
//     setResults(e.value);
//   };

// const onSpeechPartialResults = (e) => {
//     //Invoked when any results are computed
//     console.log('onSpeechPartialResults: ', e);
//     setPartialResults(e.value);
//   };

// const onSpeechVolumeChanged = (e) => {
//     //Invoked when pitch that is recognized changed
//     console.log('onSpeechVolumeChanged: ', e);
//     setPitch(e.value);
//   };

// const startRecognizing = async () => {
//     //Starts listening for speech for a specific locale
//     try {
//       await Voice.start('en-GB');
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

// const stopRecognizing = async () => {
//     //Stops listening for speech
//     try {
//       await Voice.stop();
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

// const cancelRecognizing = async () => {
//     //Cancels the speech recognition
//     try {
//       await Voice.cancel();
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };

// const destroyRecognizer = async () => {
//     //Destroys the current SpeechRecognizer instance
//     try {
//       await Voice.destroy();
//       setPitch('');
//       setError('');
//       setStarted('');
//       setResults([]);
//       setPartialResults([]);
//       setEnd('');
//     } catch (e) {
//       //eslint-disable-next-line
//       console.error(e);
//     }
//   };
  
