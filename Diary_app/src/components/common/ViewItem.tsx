import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
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

const DATA: ItemData[] = [
    {
        id: "0", date: "4/21/2023", tags: ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"],
        isPhoto: false, isQuote: false, isDiary: false
    },
    {
        id: "1", date: "4/15/2023", tags: ["Homework", "TryHard", "ILoveThis", "Longterm"],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "2", date: "4/11/2023", tags: ["Pizza", "Lunch", "GirlFriend", "Expo"],
        isPhoto: true, isQuote: true, isDiary: true
    },
    {
        id: "3", date: "4/10/2023", tags: ["NeverGiveUp", "Dinner", "BeBrave", "Samsung"],
        isPhoto: false, isQuote: true, isDiary: true
    }
];
interface Props {
    item: ItemData;
    // input : any;
    // setInput: any;
}
const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ViewItem = (prop: Props) => {
    const navigation = useNavigation()
    const item = prop.item;
    let color = "white";
    const dateStringFormat = (dateStr: string) => {
        let day: string = dateStr.split("/")[1];
        let month: string = months[parseInt(dateStr.split("/")[0]) - 1];
        let year: string = dateStr.split("/")[2];
        let dateFormat: string = month + " " + day + " " + year;
        return dateFormat
    }
    console.log('item', item);
    return (
        <ItemContainer style={{ borderColor: color }} onPress={() => {
            console.log("item.id", item.id);

            navigation.navigate('DiaryDetail', { index: item.id })
        }}>
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
                            return <Tag key={index} text={tag} style={{ borderColor: "white" }} textStyle={{ color: "white", fontFamily: 'Poppins-Regular' }} />
                    })
                }
            </TagArea>
        </ItemContainer>

    );

}
export default ViewItem;