import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Tag from './Tag';

const ItemContainer = styled(TouchableOpacity)`
    height: 85px;
    margin-top: 10px;
    background-color: #f8dca8e8;
    border-radius: 15px;
    border: 1px;
    flex-direction: column;
`;
const FlexRow = styled(View)`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
`;
const Date = styled(Text)`
    margin-left: 10px;
    font-size: 25px;
    text-align: left;
`;
const Icons = styled(Text)`
    margin-right: 10px;
    font-size:20px;
`;
const TagArea = styled(View)`
    margin-left: 10px;
    margin-top: 10px;
    flex-direction: row;
`;

type ItemData = {
    id: string;
    date: string;
    tags: string[];
    isPhoto: boolean;
    isQuote: boolean;
    isDiary: boolean;
};

interface Props {
    item : ItemData;
    // input : any;
    // setInput: any;
}

const ViewItem = (prop : Props) => {
    const item = prop.item;
    let color;
    if (item.isPhoto && item.isDiary) {
        color = "#000000e8";
    } else if (item.isPhoto && !item.isDiary) {
        color = "#1d0f5ce8";
    } else if (!item.isPhoto) {
        color = "#fa6956e8"
    } else {
        color = "#95bac9e8"
    }

    console.log('item', item);
    return (
        
        
        <ItemContainer style={{borderColor:color}}>
                <FlexRow>
                    <Date>{item.date}</Date>
                    <Icons>{item.id}</Icons>
                </FlexRow>
                
                <TagArea>
                    {/* <FlatList data={dict_tags} renderItem={renderItem} keyExtractor={(dict)=>dict.index} 
                /> */}
                
                    {
                        item.tags.map((tag: string, index:number)=> {
                            if (index < 3) 
                                return <Tag text={tag}/>
                        })
                    }
                </TagArea>
        </ItemContainer>
        
    );
    
}
export default ViewItem;