import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import FunctionComponents, { editEnable, setEditEnable } from './FunctionComponents/FunctionComponents';
import { RouteProp } from '@react-navigation/native';
import { data } from '../../data/diaryData.json'
import { TouchableHighlight } from 'react-native';
import diaryData from '../../data/diaryData.json'

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
export let setCountEx: any;
export let countEx: number;
export let updateTagZoneEx: any;

function TagZone(props: any): JSX.Element {

    return (props.content)
}

function DiaryEdit(route: any): JSX.Element {
    const renderItem = ({ item, index }: { item: string, index: number }) => {
        return <Item key={index} title={item} index={index} />;
    };
    // const jsonId = route.route.params.id
    const index = route.route.params.index
    //temporary data 
    const data = diaryData.data
    // const jsonContent = ["Moungsung Im", "Sunghoon Kang", "Jisan Park", "HooHoo", "Georgia Tech", "Creative X"]
    const [content, setContent] = useState<string[]>(data[index].content)

    const [count, setCount] = useState<number>(content.length)
    countEx = count
    setCountEx = setCount
    const jsonDate = data[index].date
    const [tagZoneContent, setTagZoneContent] = useState<JSX.Element>(<FlatList
        data={content}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
    />)


    const deleteTag = (index: number) => {
        // if (enableDelete)
        delete content[index]
        setContent(content)
        setCount(count - 1)
        // decreaseCount()
        updateTagContent()

    }
    const Item = ({ title, index }: ItemProps & { index: number }) => {
        if(title==undefined){
            return(
                <></>
            )
        }
        return (
            
                    <View style={{ position: 'relative' }}>
                        <StyledTagWord onLongPress={() => { setEditEnable(true); }} >
                            <Text style={{
                                color: 'white'
                            }} key={index + title}>{title}</Text>
                        </StyledTagWord>
                        <View style={{ position: 'absolute', right: 0 }}>
                            {
                                editEnable &&
                                <TouchableHighlight
                                    onPress={() => {
                                        deleteTag(index)
                                        // setCountEx(countEx - 1)
                                    }}
                                    style={{
                                        borderRadius: 50,
                                        borderColor: 'white',
                                        backgroundColor: 'black',
                                        width: 25,
                                        height: 25,
                                    }}>
                                    <Text style={{
                                        color: 'white',
                                        textAlign: 'center'
                                    }}>
                                        X
                                    </Text>
                                </TouchableHighlight>
                            }

                        </View>
                    </View>
        );
    };

    const updateTagContent = () => {
        let contentHolder = (<FlatList
            data={content}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
        />)
        setTagZoneContent(contentHolder)
    }
    updateTagZoneEx = updateTagContent
    useEffect(() => {
        // updateTagContent()
        setTagZoneContent(tagZoneContent)
        updateTagContent()

    }, [editEnable, count, content])
    //turn on the textinput
    const [writeDiary, setWriteDiary] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const FunctionButtonResult = FunctionComponents()
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
                    {jsonDate}
                </Text>

                <TagZone content={tagZoneContent} />
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


