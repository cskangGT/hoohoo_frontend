import React from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styled from 'styled-components';
import Tag from './Tag';

const ItemContainer = styled(TouchableOpacity)`
    flex: 1;
    height: 90px;
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
    /* flex : 2; */
`;
const Icons = styled(Text)`
    /* flex: 1; */
    margin-right: 10px;
    font-size:20px;
`;
const TagContainer = styled(View)`
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
// type Dict_tag = {
//     index: number;
//     tag:string;
// }
interface Props {
    item : ItemData;
    // input : any;
    // setInput: any;
}

const ItemView = (prop : Props) => {
    const item = prop.item;
    
    console.log('item', item)
    return (
        <ItemContainer>
                <FlexRow>
                    <Date>{item.date}</Date>
                    <Icons>{item.id}</Icons>
                </FlexRow>
                
                <TagContainer>
                    {/* <FlatList data={dict_tags} renderItem={renderItem} keyExtractor={(dict)=>dict.index} 
                /> */}
                {/* {console.log('{item.tags}', item.tags)} */}
                    {
                        item.tags.map((tag: string, index:number)=> (
                             <Tag text={tag}/>
                             ))
                    }
                </TagContainer>
        </ItemContainer>
    );
    
}
export default ItemView;