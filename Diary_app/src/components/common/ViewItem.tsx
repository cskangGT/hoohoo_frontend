import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Tag from '../common/Tag';
import MyIcon from './Icon';
const photo = require('../../assets/gallery.png');
const diary = require('../../assets/Text.png');
const ItemContainer = styled(TouchableOpacity)`
    height: 80px;
    margin-top: 10px;
    background-color: transparent;
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
    font-size: 20px;
    text-align: left;
    color: white;
`;
const IconContainer = styled(View)`
    flex-direction: row;
    margin-left: auto;
    margin-right: 10px;
`;
const TagArea = styled(View)`
    margin-left: 10px;
    margin-top: 5px;
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
    item: ItemData;
    // input : any;
    // setInput: any;
}
const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ViewItem = (prop: Props) => {
    const item = prop.item;
    let color = "white";
    // if (item.isPhoto && item.isDiary) {
    //     color = "#000000e8";
    // } else if (item.isPhoto && !item.isDiary) {
    //     color = "#1d0f5ce8";
    // } else if (!item.isPhoto) {
    //     color = "#fa6956e8";
    // } else {
    //     color = "#95bac9e8";
    // }
    const dateStringFormat = (dateStr: string) => {
        let day: string = dateStr.split("/")[1];
        let month: string = months[parseInt(dateStr.split("/")[0]) - 1];
        let year: string = dateStr.split("/")[2];
        let dateFormat: string = month + " " + day + " " + year;
        return dateFormat
    }
    console.log('item', item);
    return (
        <ItemContainer style={{ borderColor: color }}>
            <FlexRow>
                <Date> {dateStringFormat(item.date)} </Date>
                <IconContainer>
                    {
                        item.isPhoto && <MyIcon source={photo} style={{ marginTop: 5, marginRight: 5 }} imageStyle={{ width: 25, height: 25 }} />
                    }
                    {
                        item.isDiary && <MyIcon source={diary} style={{ marginTop: 5, marginRight: 5 }} />
                    }
                </IconContainer>
            </FlexRow>

            <TagArea>
                {/* <FlatList data={dict_tags} renderItem={renderItem} keyExtractor={(dict)=>dict.index} 
                /> */}

                {
                    item.tags.map((tag: string, index: number) => {
                        if (index < 3)
                            return <Tag text={tag} style={{ borderColor: "white" }} textStyle={{ color: "white" }} />
                    })
                }
            </TagArea>
        </ItemContainer>

    );

}
export default ViewItem;