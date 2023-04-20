import { View, Text, Dimensions, Image, Animated } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../../components/common/Button';
import TextAnimation from '../../components/common/TextAnimation';

const background = require('../../assets/Intro_background.png');
const font = require('../../assets/IntroFont.png');
const droplet = require('../../assets/try4.jpg');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StyledText = styled(Text)`
    margin-top: 200px;
    padding: 30px;
    /* background-color: ; */
    text-align: center;
    font-style: italic;
    font-weight: bold;
    font-size: 50px;
    color: white;
`;

const Background = styled(View)`
    flex: 1;
    /* margin-top: 100px; // 헤더로부터 100px아래부터 백그라운드 시작 */
    width: 100%;
    height:100%;
`;

const IntroImage = styled(View)`
  width: ${windowWidth - 20}px;
  position: absolute;
  margin-left: 10px;
  height: ${windowHeight - 100}px; // 150은 시작버튼을 위해서 남겨준다.
`;
const ImageBG = styled(Image)`
    flex: 1;
`;
const Drop = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.60;
`;
const AniView = styled(Animated.View)`
    width:100%;
    height: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
`;
// const GoToTagRecording = (nav: any) => {


// };
function FadeImage(props: any): JSX.Element {
    const [opacity, setOpacity] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (<AniView style={{ opacity }}>
        <Image source={font} />
    </AniView>
    );
}

function Anime(props: any & JSX.Element): JSX.Element {
    return props.textAnime
}
const IntroScreen = ({ navigation, route }: any) => {

    const texts = [{ id: 0, text: "I Know" },  // storing text data 
    { id: 1, text: "You Want to Know" },
    { id: 2, text: "Who You Are" }];
    const [text, setText] = useState<string>(texts[0].text); // data
    const [textContents, setTextContents] = useState<JSX.Element>(<TextAnimation text={texts[0].text} ></TextAnimation>);
    const [showAni, setShowAni] = useState<number>(1);
    if (showAni === 1) { // only show animation case, this is because keep counting time when re-rendering.
        const timeout1 = setTimeout(() => {
            // console.log("first setText --11", text);
            setText(texts[1].text);
            // console.log("first setText --", text);

        }, 6000); // 6초 뒤에 second animation start
        if (text === texts[1].text) clearTimeout(timeout1);
    }

    useEffect(() => { // when text is changed, enter here (asynch)

        if (text === texts[1].text) {
            setTextContents(<TextAnimation text={text} ></TextAnimation>);
            setTimeout(() => {
                // console.log("settimeout for second text");
                setText(texts[2].text); // 3초 뒤에 third animation start, 
            }, 3000);
        } else if (text === texts[2].text) {

            setTextContents(<TextAnimation text={text} ></TextAnimation>);
            // console.log(showAni);
            setTimeout(() => { setShowAni(0) }, 4000);

        }
        // clearTimeout(timeout1);
    }, [text]);


    return (
        <Background>

            <ImageBG source={background} resizeMode={'cover'} />

            <Drop source={droplet} resizeMode={'contain'} />
            <View style={{ opacity: 0.3, backgroundColor: 'black', width: '100 %', height: '100 %', position: 'absolute' }}></View>
            <IntroImage>

                {showAni === 1 ? <Anime textAnime={textContents as JSX.Element}>
                </Anime> : <FadeImage></FadeImage>}


            </IntroImage>
            <CustomButton
                style={{ position: 'absolute', bottom: '5 %', left: '24 %' }}
                title="Go to TagRecording"
                onPress={() => navigation.navigate('TagRecording')}
                backgroundColor="transparent"
                textStyle={{ textDecorationLine: 'underline', fontSize: 17, color: 'white' }} />
        </Background>);
};


export default IntroScreen;
