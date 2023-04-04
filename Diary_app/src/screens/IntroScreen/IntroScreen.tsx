import { View, Text, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CustomButton from '../../components/common/Button';
import TextAnimation from '../../components/common/TextAnimation';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// const windowDimensions = Dimensions.get('window');
// const screenDimensions = Dimensions.get('screen');

const StyledText = styled(Text)`
    margin-top: 200px;
  padding: 50px;
  /* background-color: ; */
  text-align: center;
  font-style: italic;
  font-weight: bold;
  font-size: 50px;
  color: rgb(255, 227, 180);
`;

const Background = styled(View)`
    flex: 1;
    /* margin-top: 100px; // 헤더로부터 100px아래부터 백그라운드 시작 */
    width: 100%;
    height:100%;
    background-color: 'rgb(43, 36, 117)';
`;
const IntroImage = styled(View)`
  width: ${windowWidth - 20}px;
  margin-left: 10px;
  height: ${windowHeight-100}px; // 150은 시작버튼을 위해서 남겨준다.
`;
// const GoToTagRecording = (nav: any) => {

// };


function Anime( props : any & JSX.Element): JSX.Element {
    return props.textAnime
}
const IntroScreen = ({ navigation, route }: any) => {
    
    const texts = [{id: 0,text: "I Know"},  // storing text data 
                    {id: 1,text:"You Want to Know"},
                    {id: 2,text: "Who You Are"}]; 
    const [text, setText] = useState<string>(texts[0].text); // data
    const [textContents, setTextContents] = useState<JSX.Element>(<TextAnimation text={texts[0].text}></TextAnimation>);
    const [showAni, setShowAni] = useState<number>(1);
    if (showAni === 1) { // only show animation case, this is because keep counting time when re-rendering.
        const timeout1 = setTimeout(()=> {
            // console.log("first setText --11", text);
            setText(texts[1].text);    
            // console.log("first setText --", text);
            
        }, 6000); // 6초 뒤에 second animation start
        if (text === texts[1].text)  clearTimeout(timeout1);
    }
        
    useEffect( () => { // when text is changed, enter here (asynch)
   
        if (text ===texts[1].text) {
            setTextContents(<TextAnimation text={text} ></TextAnimation>);
            setTimeout( () => {
                // console.log("settimeout for second text");
                setText(texts[2].text); // 3초 뒤에 third animation start, 
            }, 3000);
            
            
        } else if (text ===texts[2].text) {
            
            setTextContents(<TextAnimation text={text} ></TextAnimation>);
            // console.log(showAni);
            setTimeout( () => {setShowAni(0)}, 4000);
            
        }
        // clearTimeout(timeout1);
    }, [text]);
    
    
    return (
        <Background>
            <IntroImage>
                {/* <StyledText> Hoo hoo</StyledText>  */}
                {/* 나중에 gif나 이미지로 넣을 것, 지금은 animation으로 처리*/}
                {/* <View style={{marginTop:100}}> */}
                {showAni === 1?<Anime textAnime={textContents as JSX.Element}>
                </Anime> : <StyledText> Hoohoo </StyledText> }
                {/* <Anime textAnime={textContents as JSX.Element}>
                </Anime> */}
                {/* {texts.map((value, index) => {
                    if (showAni===1) {
                        
                            return <TextAnimation text={value.text}></TextAnimation>;
                        
                    } else {
                            return <Text style={{color:'white'}}>Jisan</Text>};
                        })} */}
                
                {/* </View> */}
                {/* <TextAnimation text="I Know" time={300}></TextAnimation> */}
                {/* <TextAnimation text="You Want to Know" time={3000}></TextAnimation>
                <TextAnimation text="Who You Are" time={3000}></TextAnimation> */}
                {/* 버튼 나오게 한다.  */}
                {/* 3초 기다린다. */}
                {/*  it will be start button */}
                
            </IntroImage>
            <CustomButton
                title="Go to Diary"
                onPress={() => navigation.navigate('Diary')}
                backgroundColor='rgb(255, 227, 180)'/>
            <CustomButton
                title="Go to TagRecording"
                onPress={() => navigation.navigate('TagRecording')}
                backgroundColor='rgb(255, 227, 180)'/>
            
            {/* {showButton} */}
            {/* rgb(202, 177, 157) */}
        </Background>);
};


export default IntroScreen;
