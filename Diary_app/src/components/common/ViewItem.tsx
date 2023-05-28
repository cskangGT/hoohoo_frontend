import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import styled from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import Tag from '../common/Tag';
import CheckIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';

const Container = styled(View)`
  /* flex:1; */
  /* width:100%; */
  flex-direction: row;
`;
const CheckBox = styled(TouchableOpacity)`
    flex:0.07;
    margin-top: 10px;
    justify-content: center;
`;
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
  margin-left: 15px;
    border-left-color: white;
    border-left-width: 1px;
`;
const FlexRow = styled(View)`
/* border-color: white;
border-width:1px; */
    flex:0.17;
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
    flex: 0.82;
    /* margin-left: 5px;
    margin-right: 5px; */
    
    margin-right:5px;
    flex-direction: row;
`;
const InfoButton = styled(TouchableOpacity)`
    padding: 2.5px;
`;
type ItemData = {
    id: string;
    date: string;
    tags: string[];
    diary: string[];
    photo: any;
    isPhoto: boolean;
    isQuote: boolean;
    isDiary: boolean;
};

const DATA: ItemData[] = [
    {
        id: "0", date: "4/21/2023", tags: ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:[require('../../assets/DiaryEditPage/Note.png')],
        isPhoto: false, isQuote: false, isDiary: false
    },
    {
        id: "1", date: "4/15/2023", tags: ["Homework", "TryHard", "ILoveThis", "Longterm"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:[require('../../assets/Background.png'),require('../../assets/remove.png')],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "2", date: "4/11/2023", tags: ["Pizza", "Lunch", "GirlFriend", "Expo"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:[require('../../assets/tagRecordingBg.png')],
        isPhoto: true, isQuote: true, isDiary: true
    },
    {
        id: "3", date: "4/10/2023", tags: ["NeverGiveUp", "Dinner", "BeBrave", "Samsung"],
        diary:["Jisan Park is Genius. Moungsung is so smart. but Sung is good."], photo:[require('../../assets/ListView_bg.png')],
        isPhoto: false, isQuote: true, isDiary: true
    }
];
interface Props {
    item: ItemData;
    // input : any;
    // setInput: any;
    isSelectable?: boolean;
    prevData: ItemData | undefined;
    setPrevData: (b : ItemData) => void;
    deleteData: boolean;
    setDeleteData: (a: boolean) => void;
    addData : boolean;
    setAddData: (c: boolean)=>void;
}
const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May",
    "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ViewItem = (prop: Props) => {
    const navigation = useNavigation()
    const {item, isSelectable, prevData, setPrevData, deleteData, setDeleteData, addData, setAddData} = prop;
    let color = "white";
    const [checked, setChecked] = useState<boolean>(false);
    const dateStringFormat = (dateStr: string) => {
        let day: string = dateStr.split("/")[1];
        let month: string = months[parseInt(dateStr.split("/")[0]) - 1];
        let year: string = dateStr.split("/")[2];
        let dateFormat: string = month + " " + day;
        return dateFormat
    }
    
    
    const [icon, setIcon] = useState<JSX.Element>(<CheckIcon 
        name={checked? 'check-circle-outline':'checkbox-blank-circle-outline'} 
        size={25} color={'white'} />);
    
    useEffect(()=> {
        setIcon(<CheckIcon name={checked? 'check-circle-outline':'checkbox-blank-circle-outline'}  size={25} color={'white'} />)
    }, [checked]);
    
    useEffect(()=>{
        setChecked(false);
        setDeleteData(false)
        setAddData(true)
        setPrevData(null)
    }, [isSelectable])
    return (
        <Container>
            {isSelectable ?(
            <CheckBox onPress={()=> {
                if (checked === false) { //  add data
                    setChecked(true);
                    if (deleteData === true) { // 더할때 같은 데이터 일때
                        setDeleteData(false);
                        setAddData(true);
                    }
                    else { // 더할때 같은데이터가 아닐때 
                        // console.log("addedData in ViewITem", prevData);
                        // console.log("deleteData122", deleteData);
                        setAddData(true);
                        setPrevData(item);
                        
                    }
                    
                    // const newArr:ItemData[] = [...exportData, item];
                    // console.log("exportData", newArr);
                    // setExportData(newArr);
                } else { // delete data
                    

                    setChecked(false);
                    if (addData === true) { // delete and prev same item 
                        // setDeleteData(true);
                        setAddData(false);
                        setPrevData(item);
                    }
                    else { // 지우지만 같은 데이터가 아닐떄 
                        console.log("item", item);
                        
                        setDeleteData(true);
                        setPrevData(item);
                        
                    }
                    
                    // console.log("newData", newData);
                    // setExportData(newData);
                }   
            }}>{icon}</CheckBox>):(<View></View>)}
        <ItemContainer style={{ borderColor: color, flex: isSelectable? 0.95: 1, marginLeft:isSelectable? 10: 0 }}>
            <CardContainer>
            <FlexRow>
                <Date> {dateStringFormat(item.date)} </Date>
            </FlexRow>

            <TagArea horizontal={true} showsHorizontalScrollIndicator={false}>
                
                {
                    item.tags.map((tag: string, index: number) => {
                        return <Tag key={index} text={tag} style={{  }} textStyle={{ fontSize:13, color: "white", fontFamily: 'Poppins-Regular' }} />
                    })
                }
            </TagArea>
            <InfoButton onPress={() => {
                    console.log("item.id", item.id);
                    navigation.navigate("DiaryDetail", { index: item.id })
                }} activeOpacity={0.6}>
            <Icon name="information-circle-outline" size={20} color='white' />
            </InfoButton>
            </CardContainer>
        </ItemContainer></Container>
    );
}
export default ViewItem;