import React, { useState, useEffect, useRef } from 'react';
import { Text, TouchableHighlight,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DefaultTheme } from 'styled-components';
const theme: DefaultTheme={
    fontMedium: 35,
    mainBlue: '',
    mainDarkGrey: '',
    mainLightGrey: '',
    mainRed: '',
    fontLarge: 0,
    fontRegular: 0,
    fontSmall: 0,
    weightBold: 0,
    weightMedium: 0,
    weightRegular: 0,
    lineHeightRegular: 0,
    lineHeightMicro: 0
}
type Props = {
    text: string;
    isEven?: boolean;
    leftMargin?: number;
    rightMargin?: number;
};

function LimitedText({ text, isEven, leftMargin, rightMargin }: Props): JSX.Element {
    let maxLength = 5
    let revealDelay = 500
    const [visibleText, setVisibleText] = useState<string>(text.substring(0, maxLength));
    const revealIndex = useRef(maxLength);
    const navigation = useNavigation();
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (revealIndex.current < text.length) {
                let newVisibleChar = text.charAt(revealIndex.current);
                let newVisible =
                    visibleText.substring(1, maxLength) + newVisibleChar;
                setVisibleText(newVisible);
                revealIndex.current++;
            }else if(revealIndex.current == text.length){
                
                let newVisibleChar = text.charAt(0);
                let newVisible =
                    visibleText.substring(1, maxLength)+newVisibleChar;
                setVisibleText(newVisible);
                revealIndex.current = 1
            }
        }, revealDelay);

        return () => clearInterval(intervalId);
    }, [text, visibleText, revealDelay, maxLength]);
    const handlePress = () => {
        if (navigation) {
            navigation.navigate('DiaryEdit')
        }
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text
                style={{
                    textAlign: isEven ? 'left' : 'right',
                    marginLeft: leftMargin,
                    marginRight: rightMargin,
                    borderRadius: 50,
                    padding: 10,
                    fontSize: theme.fontMedium
                }}>{visibleText}</Text>
        </TouchableOpacity>
    )
};

export default LimitedText;
