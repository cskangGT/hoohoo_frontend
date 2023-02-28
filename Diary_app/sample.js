// const recorder = require('node-record-lpcm16');

// // Imports the Google Cloud client library
// const speech = require('@google-cloud/speech');
import recorder from 'node-record-lpcm16';
import speech from '@google-cloud/speech';
// Creates a client
const client = new speech.SpeechClient();

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const encoding = 'Encoding of the audio file, e.g. LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US';
const encoding = 'LINEAR16';
const request = {
    config: {
        encoding: encoding,
        sampleRateHertz: sampleRateHertz,
        languageCode: languageCode,
    },
    single_utterance : true,
    interimResults: false, // If you want interim results, set this to true
};
let stop = false;
let pr = null;
// Create a recognize stream
const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data => {
        pr = data;
        process.stdout.write(
            pr.results[0] && data.results[0].alternatives[0]
                ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                : '\n\nReached transcription time limit, press Ctrl+C\n'
        )}
    );


// Start recording and send the microphone input to the Speech API.
// Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
recorder
    .record({
        sampleRateHertz: sampleRateHertz,
        threshold: 0.07,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);

if (stop) {
    recorder.stop();
    recognizeStream.end();
}
console.log('Listening, press Ctrl+C to stop.');