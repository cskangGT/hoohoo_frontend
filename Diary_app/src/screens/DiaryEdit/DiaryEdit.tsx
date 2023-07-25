import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import PhotoUpload from './FunctionComponents/PhotoUpload';
import styled from 'styled-components';
import FunctionButton from './FunctionComponents/FunctionButton';
import { RouteProp } from '@react-navigation/native';
import { data } from '../../data/diaryData.json'
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

const Item = ({ title, index }: ItemProps & { index: number }) => {
    return (

        <StyledTagWord >
            <Text style={{
                color: 'white'
            }} key={index + title}>{title}</Text>
        </StyledTagWord>
    );
};
const renderItem = ({ item, index }: { item: string, index: number }) => {
    return <Item key={index} title={item} index={index} />;
};

function DiaryEdit(route: any): JSX.Element {
    const jsonId = route.route.params.id
    const jsonContent = route.route.params.contents
    //turn on the textinput
    const [writeDiary, setWriteDiary] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const FunctionButtonResult = FunctionButton()
    const FunctionButtonComponent = FunctionButtonResult[0]
    const Photos = FunctionButtonResult[1]
    const Textinput = FunctionButtonResult[2]
    const savedText = FunctionButtonResult[3]
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
                    Mar 25 2023
                </Text>

                <FlatList
                    data={jsonContent}
                    renderItem={renderItem}
                    // keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                {Photos}
                {/* <PhotoUpload /> */}
                <Text style={{
                    margin: 15,
                    fontSize: 25,
                    borderBottomWidth: 2,
                    borderStyle: 'dotted',
                    borderColor: 'white',
                    color: 'white'

                }}>
                    {savedText}
                </Text>
                {Textinput}


            </ScrollView>

            <View style={{
                position: 'absolute', // Set position to absolute
                width: 50,
                height: 50,
                alignSelf: 'center',
                bottom: 60, // Position the component 10 units from the bottom
                // right: 10, // Position the component 10 units from the right
            }}>
                {/* <FunctionComponents /> */}
                {FunctionButtonComponent}
            </View>
        </StyledBackgroundView>

    );
};
export default DiaryEdit;


