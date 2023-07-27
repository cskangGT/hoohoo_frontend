import React from 'react';
import { TouchableOpacity, Image } from "react-native";
import styled from 'styled-components';
const Container = styled(TouchableOpacity)`
`;
const Imagebutton = styled(Image)`
`;
interface Props {
    style?: {};
    src: {};
    onPress: () => void;
    imageStyle?: {};
    resize?: string;
}
const ImageButton = (props: Props) => {
    const { style, src, onPress, imageStyle, resize } = props;
    return (
        <Container
            activeOpacity={0.8}
            style={style}
            onPress={onPress}>
            <Imagebutton source={src} style={imageStyle} resizeMode={resize !== undefined ? 'contain' : resize} />

        </Container>
    )
}
export default ImageButton;
