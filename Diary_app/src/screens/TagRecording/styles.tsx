import { ImageBackground, Image, TouchableHighlight, View, Text, ScrollView, TextInput, SafeAreaView, Animated } from "react-native";
import styled from "styled-components";
import ImageButton from "../../components/common/ImageButton";
import CustomButton from "../../components/common/Button";
import { useState } from "react";

//grand parent view for tag recording page
export const Container = styled(ImageBackground)`
    flex:1;
`;

export const SafeArea = styled(SafeAreaView)`
    flex: 1 
`

//set the tag pag scrollable so that user can scroll while keyboard is openned
export const ScrollableView = styled(ScrollView)`
    flex:1;
`
export const contentContainer = {
    flexGrow: 1
}
export const flexOne = { flex: 1 }
export const whiteFont = { color: 'white', fontSize: 21 }
//contains List and Save buttons 
export const NavButton = styled(CustomButton)`
    padding: 2%;
    justify-content: center;
    align-content:center;
`
//set Save and List buttons at the right of the screen.
export const ButtonContainer = styled(View)`
    flex-direction:row;
    justify-content: flex-end;
    align-content:center;
    `;
//contains tag horizontally.
export const TagContainers = styled(View)`
    flex:0.3;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap-reverse;
    padding-left:5%;
    padding-right:5%;
`;
//contians text input
export const InputTextContainer = styled(View)`
    flex:0.4;
    
   
`
// align-items:center;
//user input
export const InputText = styled(TextInput)`
    padding:5%;
    font-size: 60px;
    text-align:center;
    border-bottom-color: white;
    border-bottom-width: 2px;
    width: 80%;
    color:white;
    align-self:center;
`;
//this component could be reusable to show text in a box.
//contains input tags on recorded & STT area
export const StyledButtonContainer = styled(View)`
`
// //tags are scrollable
// export const TagScrollView = styled(ScrollView)`
//     flex: 0.2;
//     margin-left: 3%;
//     margin-right: 3%;
// `

//contains mic container
export const MicContainerContainer = styled(View)`
    justify-content: center;
    height:30%;
`
// flex:0.2;

//contians either text mode or speech mode elements
export const MicContainer = styled(View)`
    flex: 1;
    justify-content:center;
    align-self: center;
`;
//change mode button image for text mode
export const ChangeModeButton = styled(Image)`
    width: 50px; 
    height: 50px;
    align-items: center;
`;
//mic button for speech mode
export const Mic = styled(Image)`
    width: 50px; 
    height: 50px;
    align-self:center;
`;

export const Transition = styled(ImageButton)`
`;

//contains text and delete button of each tag
export const TagComponent = styled(View)`
    border-width: 1px;
    border-color: gray;
    border-radius: 20px;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 1%;
    padding-right: 2%;

    background-color: #808080;
    opacity: 0.75;
    margin: 5px;
    align-items: center;
    flex-direction: row;
`;

//set tag text color white
export const TagText = styled(Text)`
    color: white;
    margin-left:2px;
`;
//the X button container
export const RemoveButton = styled(TouchableHighlight)`
    width: 18px;
    height: 18px;
    border-radius: 30px;
    overflow: hidden;
    margin: 3%;
    background-color:#808080;
`;

//the image of X button
export const RemoveTagImage = styled(Image)`
    width: 100%;
    height: 100%;
`;

export const WordView = styled(View)`
    flex:1;
`;

//the background water spread image
export const TransparentView = styled(View)`
    width: 100%;
    height: 100%;
    background-color: transparent;
    position: absolute;
`

//opacity 0.3
export const OpacityView = styled(View)`
    width: 100%;
    height: 100%;
    position: absolute;
    opacity: 0.3;
`

