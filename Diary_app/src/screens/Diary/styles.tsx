import { Animated, SafeAreaView, View } from "react-native";
import { IconButton } from "react-native-paper";
import styled from "styled-components";

export const BackgroundView = styled(View)`
    flex:1;
    background-color:black
`
//for Iphone
export const SafeArea = styled(SafeAreaView)`
    flex:1;
`

export const NextButtonContainer = styled(View)`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
    padding:2%;
    
`
export const ReplayPause = styled(View)`
    flex: 1;
    align-items: flex-start;
    justify-content: flex-end;
    padding:2%;
`

export const GIFandTextContainer = styled(View)`
    position: absolute;
    flex: 1;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-self: center;
    padding-right: 5%;
`
export const FlexOneView = styled(View)`
    flex:1;
`
export const MajorityView = styled(View)`
    flex:1;
`
export const MinorityView = styled(View)`
    flex-direction: row;
`
export const IconContainer = styled(IconButton)`
    margin: 0
    padding: 0;
    align-items: center;
`