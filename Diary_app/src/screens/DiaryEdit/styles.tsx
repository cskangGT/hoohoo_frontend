import { Image, Text, ImageBackground, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native'
import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FAB, IconButton } from 'react-native-paper';
const screenHeight = Dimensions.get('window').height;
//fill the screen with the background image.
export const StyledBackgroundView = styled(ImageBackground)`
    flex:1;
    padding:2%;
`
//tag zone container
export const TagZoneContainer = styled(View)`
    background-color:'rgba(71, 71, 70, 0.5)';
    border-radius:15px;
    padding:2%;
`
export const EmptyTags = styled(Text)`
    font-family: 'Poppins-Regular';
    font-size: 15px;
    margin-top:10%;
    width: 100%;
    text-align: center;
    color: #a1a1a1;
`
//contains two icons : eye , mic
export const TagZoneFirstRow = styled(View)`
    flex-direction:row;
    align-self:flex-end;
`
//for Iphone
export const SafeArea = styled(SafeAreaView)`
    flex:1;
`

//mic & view icon
export const SmallIconContainer = styled(TouchableOpacity)`
    padding:2%;
    align-items:center;
    justify-content: center;
`
export const UnactiveIconContainer = styled(View)`
    padding:2%;
    align-items:center;
    justify-content: center;
`
//each tag component
export const IndividualTagContainer = styled(View)`
    border-width: 1px;
    border-color: gray;
    border-radius: 50px;
    padding: 1%;
    background-color: rgb(71, 71, 70);
    opacity:1;
    margin: 1%;
    flex-direction:row;
    align-items:center;
`;

//contains the text data of tag
export const TagText = styled(Text)`
    color: white;
    font-family: 'Poppins-Regular';
    text-align: center;
    margin-left:6%;
`
// border-color:red;
// border-width:2px;
//contains TagList and makes it scrollable 
export const TagZoneSecondRow = styled(ScrollView)`
    height:13%;
    overflow:hidden;
`
//contains tags. only shows two rows of tags
export const VerticalList = styled(View)`
    flex-direction:row;
    flex-wrap: wrap;
`
//remove button container 
export const RemoveIconContainer = styled(TouchableOpacity)`
    width:20px;
    height:20px;
`
export const RemoveIcon = styled(Image)`
    width:100%;
    height:100%;
`
export const MajorityView = styled(View)`
    flex:0.95;
    overflow: hidden;
    border-radius: 25px;
`
//contains components at the bottom
export const FooterContainer = styled(View)`
    flex-direction:row;
`
export const FabContainer = styled(View)`
    flex:1;
`
export const FabStyle = styled(FAB.Group)`
    align-items: flex-start;
    bottom: ${screenHeight > 700 ? '-40px' : '0'};
    justify-content: flex-end;
`
export const DateContainer = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: flex-end;
`
export const NextButtonContainer = styled(View)`
    flex: 1;
    align-items: flex-end;
    justify-content: flex-start;
    padding:2%;
`

//date text container
export const TextDateContainer = styled(View)`
    padding:4%;
    background-color: #3a3535;
    opacity: 0.4;
    border-radius: 10px;
    
`;
//date text format
export const TextDate = styled(Text)`
    color: #f1f1f1;
    font-family: 'Comfortaa-Regular';
`;

export const FABTheme = {
    "colors": {
        "primary": "rgb(127, 127, 127)",
        "onPrimary": "rgb(127, 127, 127)",
        "primaryContainer": "rgb(127, 127, 127)",
        "onPrimaryContainer": "rgb(240, 240, 240)",
        "secondary": "rgb(127, 127, 127)",
        "onSecondary": "rgb(127, 127, 127)",
        "secondaryContainer": "rgb(127, 127, 127)",
        "onSecondaryContainer": "rgb(240, 240, 240)",
        "tertiary": "rgb(186, 198, 234)",
        "onTertiary": "rgb(36, 48, 77)",
        "tertiaryContainer": "rgb(59, 70, 100)",
        "onTertiaryContainer": "rgb(218, 226, 255)",
        "error": "rgb(255, 180, 171)",
        "onError": "rgb(105, 0, 5)",
        "errorContainer": "rgb(147, 0, 10)",
        "onErrorContainer": "rgb(255, 180, 171)",
        "background": "rgb(25, 28, 29)",
        "onBackground": "rgb(225, 227, 227)",
        "surface": "rgb(25, 28, 29)",
        "onSurface": "rgb(225, 227, 227)",
        "surfaceVariant": "rgb(63, 72, 74)",
        "onSurfaceVariant": "rgb(191, 200, 202)",
        "outline": "rgb(137, 146, 148)",
        "outlineVariant": "rgb(63, 72, 74)",
        "shadow": "rgb(0, 0, 0)",
        "scrim": "rgb(0, 0, 0)",
        "inverseSurface": "rgb(225, 227, 227)",
        "inverseOnSurface": "rgb(46, 49, 50)",
        "inversePrimary": "rgb(0, 104, 116)",
        "elevation": {
            "level0": "transparent",
            "level1": "rgb(127, 127, 127)",
            "level2": "rgb(127, 127, 127)",
            "level3": "rgb(127, 127, 127)",
            "level4": "rgb(127, 127, 127)",
            "level5": "rgb(127, 127, 127)",
        },
        "surfaceDisabled": "rgba(225, 227, 227, 0.12)",
        "onSurfaceDisabled": "rgba(225, 227, 227, 0.38)",
        "backdrop": "rgba(41, 50, 52, 0.4)"
    }
}

export const FlexOneTouchable = styled(TouchableOpacity)`
    flex:1
`

//contains - or camera & gallery at the center of photo.
export const MiddleButtonContainer = styled(View)`
    flex: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    justify-content: center;
    align-items: center
    width: 100%;
    height: 100%;
    z-index: 1
`
export const TopRightButtonContainer = styled(View)`
    position: absolute;
    width: 10%;
    height: 10%;
    z-index: 1;
    right: 2%;
    top: 2%;
`


export const GrayIconButton = styled(IconButton)`
    background-color: gray
`

export const FullImage = styled(Image)`
    width: 100%;
    height: 100%;
    position: absolute;
`

export const DoneText = styled(Text)`
    color: white;
    font-size: 25px;
    border-color: gray;
    border-width: 1px;
    border-radius: 10px;
    padding: 2%;
    background-color: gray;

`
