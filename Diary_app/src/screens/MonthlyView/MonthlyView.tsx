import React from 'react';
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

import Calendar from './Calendar';

// Paths to assets
const shape = require('../../assets/DiaryEditPage/shape.png');

// Styled-components
const Shape = styled(ImageBackground)`
  flex:1;
`;

const ContentContainer = styled(View)`
    width : 100%;
    margin-top: 20%;
`;

const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 2%;
  right: 6%;
  width: 100%;
  align-items: flex-end;
`;

const ButtontoList = styled(TouchableOpacity)`
    width:15%;
    border-radius: 10px;
    flex-direction: row;
    padding: 3px;
    align-items: center;
    justify-content: center;
`;

const ButtonText = styled(Text)`
    color: #fcf5f5;
    font-size: 15px;
`;

const MonthlyView = ({ navigation} : any) => {
    return (
        <View style={{backgroundColor: 'black', flex:1}} >
            <SafeAreaView style={{flex:1}}>
                <Shape source={shape} resizeMode='cover'>
                    <ContentContainer>
                        <Calendar />
                    </ContentContainer>
                    <ButtonContainer>
                        <ButtontoList onPress={() => navigation.navigate('ListView')}>
                            <ButtonText>List </ButtonText>
                            <Icon name="arrow-forward-ios" color={'#fcf5f5'}/>
                        </ButtontoList>
                    </ButtonContainer>
                </Shape>
            </SafeAreaView>
        </View>
    );
}

export default MonthlyView