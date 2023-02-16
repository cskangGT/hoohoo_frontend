import { Button, View, Text } from 'react-native';
import styled from 'styled-components';

const StyledText = styled(Text)`
  padding: 50px;
  background-color: yellow;
  text-align: center;
`;

const IntroScreen = ({ navigation, route }:any) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <StyledText> Intro Screen</StyledText>
            <Button 
                title="Go to TagRecording"
                onPress={() => navigation.navigate('TagRecording')}
            />
            {/*  it will be start button */}
        </View>);
};


export default IntroScreen;