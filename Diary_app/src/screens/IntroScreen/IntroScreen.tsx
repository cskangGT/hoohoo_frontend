import { View, Text, Dimensions, Image, Animated, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../../components/common/Button';
import TextAnimation from '../../components/common/TextAnimation';
import ImageBackground from '../../components/common/ImageBackground';

const font = require('../../assets/IntroFont.png');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const IntroImage = styled(View)`

  width: ${windowWidth - 20}px;
  position: absolute;
  margin-left: 10px;
  height: ${windowHeight - 200}px; // 200은 시작버튼을 위해서 남겨준다.
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

    const texts = [{ id: 0, text: "As the rains fall" },  // storing text data 
    { id: 1, text: "Write your day" },
    { id: 2, text: "Write your own story" }];
    const [text, setText] = useState<string>(texts[0].text); // data
    const [textContents, setTextContents] = useState<JSX.Element>(<TextAnimation text={texts[0].text} ></TextAnimation>);
    const [showAni, setShowAni] = useState<number>(1);
    if (showAni === 1) { // only show animation case, this is because keep counting time when re-rendering.
        const timeout1 = setTimeout(() => {
            // console.log("first setText --11", text);
            setText(texts[1].text);
            // console.log("first setText --", text);

        }, 3000); // 6초 뒤에 second animation start
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
            setTimeout(() => { setShowAni(0) }, 3000);

        }
        // clearTimeout(timeout1);
    }, [text]);

    const index:number = 0
    return (
        <ImageBackground>
            <IntroImage>

                {showAni === 1 ? <Anime textAnime={textContents as JSX.Element}>
                </Anime> : <FadeImage></FadeImage>}
            </IntroImage>
            <CustomButton
                style={{ position: 'absolute', bottom: '10 %', justifySelf: 'center', alignSelf: 'center' }}
                title="START"
                onPress={() => {
                    navigation.navigate('TagRecording' , {index:index})
                }}
                backgroundColor="transparent"
                textStyle={{ fontSize: 35, color: 'white', fontFamily: 'Zumattan' }} />

        </ImageBackground>);
};


export default IntroScreen;
