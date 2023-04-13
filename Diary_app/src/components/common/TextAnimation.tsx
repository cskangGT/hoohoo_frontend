import React from "react";
import { View, Animated, Dimensions } from "react-native";
import styled from 'styled-components';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


// const secondText = "You Want to Know";
// const thirdText = "Who You Are";
const Container = styled(View)`
    flex: 1;
    width: ${windowWidth*0.8}px;
    padding-left: ${windowWidth*0.15}px;
    background-color: transparent;
    text-align: center;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    /* flex-wrap: wrap; */
`;
const Anitext = styled(Animated.Text)`
    font-size: ${windowHeight * 0.04}px;
    font-weight: bold;
    color: rgb(255, 227, 180);
`;

interface Props {
    text: string;
}
// const firstText = "I Know/You Want to Know/Who You Are";
const TextAnimation = (props: Props) => {
    const {text} = props;
    // const tarr = firstText.split("/");
    // const 
    const arr = text.split(" ");
    var count = 0;
    const ref_arr = React.useRef(Array.from({ length: 10 }, () => new Animated.Value(0))).current;
    React.useEffect(() => {
        const timer = setInterval(() => {
            count++;
            const animations = ref_arr.map((item, index)=> {
                return Animated.timing(item, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                });
            });
            Animated.stagger(100, animations).start( () => { // animation 생성하는 모션 
                if (count === 3) {
                    clearInterval(timer);
                }
                setTimeout(() => {
                    const animations2 = ref_arr.map((item, index) => {
                        return Animated.timing(item, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        });
                    });
                    Animated.stagger(100, animations2.reverse()).start()
                }, 100); // 지우는 모션 보여주고 1초뒤 지우기 시작
            });
            
        }, 3000);
        
        return () =>  {
                clearInterval(timer);
            };
    }, []);




    return (
        <Container>
            {
                    arr.map((item, index)=> (
                    <Anitext key={index} style={{opacity: ref_arr[index]}} >
                        {item} {index < arr.length ? " ": ""}
                    </Anitext>
                ))
            }
        </Container>
    );

}
export default TextAnimation;