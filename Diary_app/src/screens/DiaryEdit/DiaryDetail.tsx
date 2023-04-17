import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import FunctionComponents, { showPlusButtonEx } from './FunctionComponents/FunctionComponents';
import { openCameraEx, openGalleryEx, updatePhotoContentEx } from './FunctionComponents/PhotoZone';
import diaryData from '../../data/diaryData.json'
import TagZone, { updateTagContentEx } from './FunctionComponents/TagZone';
import PhotoZone from './FunctionComponents/PhotoZone';
import NoteZone from './FunctionComponents/NoteZone';
const icon_camera = require('./FunctionComponents/icons/camera.png');
const icon_gallery = require('./FunctionComponents/icons/gallery.png');
//lighter gray
const StyledTagWord = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: gray;
    border-radius: 50px;
    padding: 10px;
    background-color: #666666;
    margin: 5px;
`;
const StyledHorizontallyAlignedItems = styled(View)`
flex-direction: row;
 justify-content: center
`
//gray
const StyledBackgroundView = styled(SafeAreaView)`
background-color: #222222; 
height:100%;
`
const StyledCircleButton = styled(TouchableOpacity)`
border-width: 1;
border-radius: 5;
background-color: #FF2511;
width: auto;
`
const StyledButtonText = styled(Text)`
font-size: 25;
text-align: center;
color: white;
width: auto;
font-color:white;
`

type ItemProps = { title: string, index: number };

//things to be used in other files 
export let countEx: number;
export let setCountEx: React.Dispatch<React.SetStateAction<number>>;

export let enableDeleteEx: boolean;
export let setEnableDeleteEx: React.Dispatch<React.SetStateAction<boolean>>;

function DiaryEdit(route: any): JSX.Element {

    // const jsonId = route.route.params.id
    const index = route.route.params.index
    //temporary data 
    const data = diaryData.data

    const [content, setContent] = useState<string[]>(data[index].content)
    const [count, setCount] = useState<number>(content.length)
    const [enableDelete, setEnableDelete] = useState<boolean>(false)
    //things to be exported
    enableDeleteEx = enableDelete
    setEnableDeleteEx = setEnableDelete
    countEx = count
    setCountEx = setCount

    const jsonDate = data[index].date

    useEffect(() => {
        if (enableDelete && count == 0) {
            setEnableDelete(false)
            showPlusButtonEx(true)
        }

        updateTagContentEx()
        updatePhotoContentEx()
    }, [enableDelete, count, content])

    return (
        <StyledBackgroundView  >
            <ScrollView>
                {/* display the date of current diary */}
                <Text
                    style={{
                        margin: 15,
                        fontSize: 30,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>
                    {jsonDate}
                </Text>

                <TagZone content={content} />
                <StyledHorizontallyAlignedItems>

                    <NoteZone />
                    <PhotoZone />

                </StyledHorizontallyAlignedItems>




            </ScrollView>
            {enableDelete &&
                <TouchableOpacity onPress={() => { setEnableDelete(false); }}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Done
                    </Text>
                </TouchableOpacity>
            }
        </StyledBackgroundView>

    );
};
export default DiaryEdit;



// <View style={{
//     position: 'absolute', // Set position to absolute
//     width: 50,
//     height: 50,
//     alignSelf: 'center',
//     bottom: 60, // Position the component 10 units from the bottom
//     // right: 10, // Position the component 10 units from the right
// }}>
//     <FunctionComponents/>
// </View>

// <TouchableOpacity
//                     onPress={() => { openCameraEx(); }}>
//                     <Image source={icon_camera} key='camera' style={{ height: 50, width: 50, borderRadius: 50 }} />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => { openGalleryEx(); }}>
//                     {/* open gallery */}
//                     <Image source={icon_gallery} key='gallery' style={{ height: 50, width: 50, borderRadius: 50 }} />
//                 </TouchableOpacity>