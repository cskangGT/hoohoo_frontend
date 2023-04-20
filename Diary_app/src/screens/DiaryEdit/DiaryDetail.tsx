import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { ImageBackground } from 'react-native';
import styled from 'styled-components';
import FunctionComponents, { showPlusButtonEx } from './FunctionComponents/FunctionComponents';
import { openCameraEx, openGalleryEx, updatePhotoContentEx } from './FunctionComponents/PhotoZone';
import diaryData from '../../data/diaryData.json'
import TagZone, { updateTagContentEx } from './FunctionComponents/TagZone';
import PhotoZone from './FunctionComponents/PhotoZone';
import NoteZone from './FunctionComponents/NoteZone';
import ImageButton from '../../components/common/ImageButton';
import { useNavigation } from '@react-navigation/native';
import sample from '../../data/data.json';

const background = require('../../assets/DiaryEditPage/Background.png');
const arrow_ListView = require('../../assets/DiaryEditPage/SideButton.png');
const microButton = require('../../assets/DiaryEditPage/microphone.png');
const screenWidth: number = Dimensions.get('window').width;
const screenHeight: number = Dimensions.get('window').height;
const StyledTagWord = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: gray;
    border-radius: 50px;
    padding: 10px;
    background-color: #666666;
    margin: 5px;
`;
const StyledHorizontallyAlignedItems = styled(View)`
    flex-direction: column;
    justify-content: center;
    padding-left: 2.5%;
    padding-right: 2.5%;
`;
const StyledBackgroundView = styled(ImageBackground)`
    width: ${screenWidth}px;
    height:${screenHeight}px;
`;
const StyledCircleButton = styled(TouchableOpacity)`
    border-width: 1px;
    border-radius: 5px;
    background-color: #FF2511;
    width: auto;
`;

const FooterContainer = styled(View)`
    flex-direction: row;
    position: absolute; // Set position to absolute
    justify-content: space-between;
    align-self: baseline;
    align-items: center;
    width: 95%;
    bottom: 4%; // Position the component 10 units from the bottom
    left: 2.5%;
    right: 2.5%;
    /* padding-top: 30; */
`;
const TextDateContainer = styled(View)`
    padding:5px;
    margin-left: 10%;
    /* margin-left:35%; */
    /* align-self: center; */
    background-color: #3a3535;
    opacity: 0.4;
    border-radius: 10px;
`;
const TextDate = styled(Text)`
    color: white;
    font-family: 'Comfortaa-Regular';
`;
const Placeholder = styled(Text)`
    color : grey;
    justify-content: center;
    text-align: center;
    font-family: 'Comfortaa-Regular';
`;
const ContainerTransition = styled(View)`
    
    align-self: flex-end;
    /* border-color: white;
    border-width: 1px; */
`;

type ItemProps = { title: string, index: number };

//things to be used in other files 
export let countEx: number;
export let setCountEx: React.Dispatch<React.SetStateAction<number>>;
export let stackComponentEx: JSX.Element[];
export let setStackComponentEx: React.Dispatch<React.SetStateAction<JSX.Element[]>>;
export let enableDeleteEx: boolean;
export let setEnableDeleteEx: React.Dispatch<React.SetStateAction<boolean>>;

function DiaryEdit(route: any): JSX.Element {
    console.log("screenHeight", screenHeight);
    console.log("width", screenWidth);
    // const jsonId = route.route.params.id
    const index = route.route.params.index

    const navigation = useNavigation();

    const data = diaryData.data
    const data2 = sample.entries[11]
    const [date, setDate] = useState(new Date());
    const [content, setContent] = useState<string[]>(data[index].content)
    const [count, setCount] = useState<number>(0)
    // this is including tag components
    const [enableDelete, setEnableDelete] = useState<boolean>(false)
    const [stackComponent, setStackComponent] = useState<JSX.Element[]>([]);
    //things to be exported
    enableDeleteEx = enableDelete
    setEnableDeleteEx = setEnableDelete
    countEx = count
    setCountEx = setCount
    stackComponentEx = stackComponent
    setStackComponentEx = setStackComponent
    const jsonDate = data[index].date;
    const months: string[] = ["January", "Febrary", "March", "April", "May",
        "June", "July", "August", "September", "October", "November", "December"];







    const dateStringFormat = () => {
        let dateStr: string = date.toLocaleDateString();;
        let day: string = dateStr.split("/")[1];
        let month: string = months[parseInt(dateStr.split("/")[0]) - 1];
        let year: string = dateStr.split("/")[2];
        let dateFormat: string = day + " " + month + " " + year;
        return dateFormat
    }
    let dateFormat: string = dateStringFormat()
    useEffect(() => {
        dateFormat = dateStringFormat()
    }, [date]);
    console.log("dateFormat", dateFormat);

    const initStackComponent = () => {

    }
    // stack the components one by one


    // organize data.json file 
    // useEffect(() => {
    //     // date , input format is MM/DD/YYYY
    //     dateFormat = dateStringFormat(data2.date)
    //     // data2.diary check and push the components
    //     if (data2.diary() !== 0) {
    //         for (let i : number = 0; i < data2.diary; i++) {
    //             stackComponent.push(<NoteZone />);
    //         }
    //         setStackComponent(stackComponent);
    //     }
    //     //

    // }, [])



    useEffect(() => {
        console.log("count", count);

        if (enableDelete && count == 0) {
            setEnableDelete(false);
            showPlusButtonEx(true);
        } // end delete mode, show plus button
        setStackComponent(stackComponentEx)
        updateTagContentEx();
        if (updatePhotoContentEx !== undefined)
            updatePhotoContentEx();
    }, [enableDelete, count, content]);

    return (
        <StyledBackgroundView source={background}>
            {/* <View style={{ top: '5 %', width:'100%', height:'100%' }}> */}
            {
                stackComponent.length === 0 ?
                    <View style={{ top: '4%' }}>
                        <TagZone content={content} index={index} />
                        <View style={{ height: '100 %' }}>

                            <Placeholder style={{ top: '20 %' }}>
                                Press + to add components
                            </Placeholder>
                        </View>
                    </View> :
                    <ScrollView style={{ top: '4%', maxHeight: '80%' }}>
                        <TagZone content={content} />
                        <StyledHorizontallyAlignedItems>
                            {
                                stackComponent.map((component, index) => (
                                    <View key={index}>
                                        {component}
                                    </View>
                                ))
                            }
                        </StyledHorizontallyAlignedItems>
                    </ScrollView>
            }
            <FooterContainer >
                <FunctionComponents style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                }} />
                <TextDateContainer><TextDate>{dateFormat}</TextDate></TextDateContainer>
                <ContainerTransition>

                    <ImageButton src={arrow_ListView} onPress={() => {
                        navigation.navigate('IntroPage')
                    }} />
                </ContainerTransition>
            </FooterContainer>


            {enableDelete &&
                <TouchableOpacity style={{ borderRadius: 5 }} onPress={() => { setEnableDelete(false); }}>
                    <Text style={{
                        color: 'white'
                    }}>
                        Done
                    </Text>
                </TouchableOpacity>
            }
            {/* </View> */}
        </StyledBackgroundView>

    );
};
export default DiaryEdit;
