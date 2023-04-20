import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import styled from 'styled-components';


const Container = styled(TouchableOpacity)`
   
    /* box-sizing: content-box; */
`;

const ButtonText = styled(Text)`
  /* align-items: center; */
`;

interface Props {
    title: string;
    style?: {};
    onPress: () => void;
    backgroundColor?: string;
    width?: any;
    height?: any;
    margin?: any;
    textStyle?: any;
}


const CustomButton = (props: Props) => {

    const { title, style, onPress, backgroundColor, width, height, textStyle } = props;
    return (
        <Container
            style={[{ backgroundColor, height, width }, style]}
            onPress={onPress}>
            <ButtonText style={textStyle} >{title}</ButtonText>
        </Container>

    )
}

export default CustomButton;