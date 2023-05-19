import React, { useEffect, useRef, useState } from 'react'
import { Animated, Image, Easing, } from "react-native";
function FadeInFadeOutComponent(props: any): JSX.Element {
    if (!props.isTextMode) {
        Animated.timing(props.fadeInAndOutAnim, { //fade in
            toValue: 1,
            duration: props.duration,
            useNativeDriver: true,
        }).start(() => {
            //do not delete this although we dont do anything
        });
    } else {
        Animated.timing(props.fadeInAndOutAnim, { //fade out 
            toValue: 0,
            duration: props.duration,
            delay: props.delay,
            useNativeDriver: true,
        }).start(() => {
            //do not delete this although we dont do anything
        });
    }
    return (
        <Animated.View style={{
            opacity: props.fadeInAndOutAnim,
        }}>
            <Image
                style={{
                    height: props.height,

                    top: props.top,
                    left: props.left,
                }}
                source={props.source}
            />
        </Animated.View>
    );
}
export default FadeInFadeOutComponent;