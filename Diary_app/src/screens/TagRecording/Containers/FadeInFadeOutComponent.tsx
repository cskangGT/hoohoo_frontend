import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, Easing, } from "react-native";
function FadeInFadeOutComponent(props: any): JSX.Element {
    if (!props.isTextMode) {
        Animated.timing(props.fadeInAndOutAnim, { //fade in
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true,
        }).start(() => {
            
        });
    } else {
        Animated.timing(props.fadeInAndOutAnim, { //fade out 
            toValue: 0,
            duration: props.duration,
            delay: props.delay,
            useNativeDriver: true,
        }).start(()=>{
            // console.log("fade out done")
        });
    }
    return (
        <Animated.View style={{
            opacity: props.fadeInAndOutAnim,
            width: '100%',
            height: '100%',
            position: 'absolute',
        }}>
            <Image
                style={{
                    width: '100%',
                    height: '100%'
                }}
                source={props.source}
            />
        </Animated.View>
    );
}
export default FadeInFadeOutComponent;