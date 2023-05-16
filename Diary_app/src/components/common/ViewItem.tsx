import React from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Tag from '../common/Tag';


const photo = require('../../assets/gallery.png');
const diary = require('../../assets/Text.png');
const ItemContainer = styled(View)`
    margin-top: 10px;
    
    background-color: #646464;
    border-radius: 15px;
    
    opacity: 0.7;
`;
const CardContainer = styled(View)`
  margin-vertical: 7px;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  margin-left:15px;
    border-left-color: white;
    border-left-width: 1px;
`;
const FlexRow = styled(View)`
    flex-direction: row;
    display: flex;
    justify-content: space-between;
    /* margin-left:15px;
    border-left-color: white;
    border-left-width: 1px; */
`;
const Date = styled(Text)`
    margin-left: 5px;
    font-size: 11px;
    text-align: left;
    color: white;
`;
// const IconContainer = styled(View)`
//     flex-direction: row;
//     margin-left: auto;
//     margin-right: 10px;
// `;
const TagArea = styled(ScrollView)`
    margin-left: 10px;
    margin-right: 10px;
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
        let dateFormat: string = month + " " + day ;
        return dateFormat
    }
    console.log('item', item);
    return (
        <ItemContainer style={{ borderColor: color }}  >
            <CardContainer>
            <FlexRow>
                <TouchableOpacity onPress={() => {
                    console.log("item.id", item.id);
                    navigation.navigate("DiaryDetail", { index: item.id })
                }}>
                <Date> {dateStringFormat(item.date)} </Date>
                </TouchableOpacity>
                {/* <IconContainer>
                    {
                        item.isPhoto && <MyIcon source={photo} style={{ marginTop: 5, marginRight: 5 }} imageStyle={{ width: 25, height: 25 }} />
                    }
                    {
                        item.isDiary && <MyIcon source={diary} style={{ marginTop: 5, marginRight: 5 }} />
                    }
                </IconContainer> */}
            </FlexRow>

            <TagArea horizontal={true}>
                {/* <FlatList data={dict_tags} renderItem={renderItem} keyExtractor={(dict)=>dict.index} 
                /> */}

                {
                    item.tags.map((tag: string, index: number) => {
                        
                        return <Tag key={index} text={tag} style={{  }} textStyle={{ fontSize:13, color: "white", fontFamily: 'Poppins-Regular' }} />
                    })
                }
            </TagArea>
            </CardContainer>
        </ItemContainer>

    );

}
export default ViewItem;