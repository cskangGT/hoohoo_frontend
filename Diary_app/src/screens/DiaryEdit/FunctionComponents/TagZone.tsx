import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components';
import { TouchableHighlight } from 'react-native';
import { countEx, enableDeleteEx, setCountEx, setEnableDeleteEx } from '../DiaryDetail';
import { showPlusButtonEx } from './FunctionComponents';

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

export let updateTagContentEx:any;
//get stirng[] content data from DiaryDetail.
function TagZone(props: any): JSX.Element {
    const renderItem = ({ item, index }: { item: string, index: number }) => {
        return <Item key={index} title={item} index={index} />;
    };
    const [content, setContent] = useState<string[]>(props.content)
    const count = countEx
    const setCount = setCountEx
    const enableDelete = enableDeleteEx
    const setEnableDelete = setEnableDeleteEx

    //things to be exported
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
        if (title == undefined) {
            return (
                <></>
            )
        }
        return (
            <View style={{ position: 'relative' }}>
                <StyledTagWord onLongPress={() => { setEnableDelete(true);showPlusButtonEx(false) }} >
                    <Text style={{
                        color: 'white'
                    }} key={index + title}>{title}</Text>
                </StyledTagWord>
                <View style={{ position: 'absolute', right: 0 }}>
                    {
                        enableDelete &&
                        <TouchableHighlight
                            onPress={() => {
                                deleteTag(index)
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
        setTagZoneContent(tagZoneContent)
        let contentHolder = (<FlatList
            data={content}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
        />)
        setTagZoneContent(contentHolder)
    }
    updateTagContentEx = updateTagContent


    return (
        <View>
            {tagZoneContent}
        </View>

    );
};
export default TagZone;


