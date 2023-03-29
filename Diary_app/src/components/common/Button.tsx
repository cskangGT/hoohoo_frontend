import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import styled from 'styled-components';


const Container = styled(TouchableOpacity)`
    align-items: center;
    
    border-radius: 10px;
    margin-left: 50px;
    margin-right: 50px;
    padding-top: 10px;
    padding-bottom: 20px;
    
    box-shadow: 2px 2px 5px black;
    /* box-sizing: content-box; */
`;

const ButtonText = styled(Text)`
  /* align-items: center; */
  align-self: center;
  font-weight: bold;
  font-size: 16px;
`;

interface Props {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    width?: any;
    height?: any;
    margin?: any;
    textStyle?: any;
}


const CustomButton = (props: Props) => {

    const { title, onPress, backgroundColor, width, height, textStyle } = props;
    return (
        <Container
            style={{ backgroundColor, height, width }}
            onPress={onPress}>
            <ButtonText style={textStyle}>{title}</ButtonText>

        </Container>

    )
}

export default CustomButton;