import React from 'react';
import { TouchableOpacity, Image } from "react-native";
import styled from 'styled-components';


const Container = styled(TouchableOpacity)`


`;

const ButtonImage = styled(Image)`

  
`;

interface Props {
    src: any;
    style?: {};
    onPress: () => void;
    backgroundColor?: string;
    color?: string;
    width?: any;
    height?: any;
    margin?: any;
    imagestyle?: {};
}


const ImageButton = (props: Props) => {

    const { src, style, onPress, backgroundColor, width, height, imagestyle } = props;
    return (
        <Container
            activeOpacity={0.8}
            style={[{ backgroundColor, height, width }, style]}
            onPress={onPress}>
            <ButtonImage source={src} style={imagestyle}></ButtonImage>

        </Container>

    )
}

export default ImageButton;