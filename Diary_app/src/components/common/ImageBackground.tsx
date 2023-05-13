import styled from 'styled-components';
import { View, Image } from 'react-native';
import React from 'react';

const background = require('../../assets/Intro_background.png');
const droplet = require('../../assets/try4.jpg');
const Background = styled(View)`
    flex: 1;
    /* margin-top: 100px; // 헤더로부터 100px아래부터 백그라운드 시작 */
    width: 100%;
    height:100%;
`;
const ImageBG = styled(Image)`
    flex: 1;
`;
const Drop = styled(Image)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.60;
`;
type ContainerProps = {
    children: React.ReactNode;
}
const ImageBackground = (props: ContainerProps) => {
    return (
        <Background>

            <ImageBG source={background} resizeMode={'cover'} />

            <Drop source={droplet} resizeMode={'contain'} />
            <View style={{ opacity: 0.3, backgroundColor: 'black', width: '100 %', height: '100 %', position: 'absolute' }}></View>
            {props.children}
        </Background>
    );
}
export default ImageBackground;