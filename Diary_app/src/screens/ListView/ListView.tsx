
import React, { useState } from 'react'
import { TouchableHighlight, TouchableOpacity, View, FlatList, TextInput, ImageBackground, Text, StatusBar, Platform } from 'react-native';
import styled from 'styled-components';
import ViewItem from '../../components/common/ViewItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';

const bg = require('../../assets/ListView_bg.png');

const BgContainer = styled(ImageBackground)`
    flex:1;
`;
const SearchArea = styled(View)`
    flex:0.04;
    margin-top:6%;
    margin-bottom: 2%;
`;

const SearchBar = styled(TextInput)`
    border-bottom-width: 2px;
    border-bottom-color: white;
    padding-bottom: 5px;
    margin-left: 7%;
    margin-right: 7%;
    padding-left: 7px;
    opacity: 0.8;
`;

const Container = styled(View)`
    flex:0.83;
    /* border-color: white;
    border-width: 1px; */
    flex-direction: row;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    /* height: 83%; */
    padding: 5px;
    padding-top: -5px;
    background-color: transparent;
    border-radius: 30px;
`;
const NavContainer = styled(View)`
    /* border-color: red;
    border-width: 1px; */
    flex:0.13;
    /* flex-wrap: wrap-reverse; */
    /* width: 94%; */
    /* padding-top: 3%; */
    /* margin-right: 3%;
    margin-left: 3%; */
    /* height:8%; */
    justify-content:flex-end;
    align-items: flex-end;
`;
const ButtontoMonth = styled(TouchableOpacity)`
    width:25%;
    bottom:4%;
    right: 6%;
    /* border-color: blue;
    border-width: 1px; */
    border-radius: 10px;
    flex-direction: row;
    padding: 3px;
    align-items: center;
    justify-content: center;
`;
const ButtonText = styled(Text)`
    color: #fcf5f5;
    font-size: 15px;
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
const texts = ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"];

const ListView = ({ navigation, route }: any) => {
    // This is rendering callback function. It shows every item view.
    
    const renderItem = ({ item, index }: { item: ItemData, index: number }) => {
        console.log('Viewitem', item);
        return (<ViewItem item={item} key={index} />);
    };
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [masterData, setMasterData] = useState<ItemData[]>(DATA);
    const [filteredData, setFilteredData] = useState<ItemData[]>(DATA);
    const [list, setList] = useState<JSX.Element>(<FlatList data={DATA} renderItem={renderItem}
        keyExtractor={(item) => item.id} />);


    const handleSearch = (text: string) => {
        setSearchQuery(text);
        console.log('query', text);
        const filtered = masterData.filter((item) =>
            item.tags.some(tag => tag.toLowerCase().includes(text.toLowerCase())),
        );
        setFilteredData(filtered);
        setList(<FlatList data={filtered} renderItem={renderItem}
            keyExtractor={(item) => item.id} />);
    };

    return (
        
        <BgContainer source={bg} resizeMode='cover' style={{flex:1}}>
            <SafeAreaView style={{flex: 1}}>
            <SearchArea>
                <SearchBar
                    onChangeText={handleSearch}
                    placeholderTextColor="#dfdfdf"
                    style={{color:'white', fontSize:14}}
                    value={searchQuery}
                    placeholder="Search by tags"
                />
            </SearchArea>

            <Container>
                {list}
            </Container>
            <NavContainer>
                <ButtontoMonth onPress={() => {
                    console.log("pressed");
                    navigation.navigate('MonthlyView');
                }}>
                    <ButtonText>Calendar </ButtonText>
                    <Icon name="arrow-forward-ios" color={'#fcf5f5'}/>
                </ButtontoMonth>
            </NavContainer>
            </SafeAreaView>
        </BgContainer>
        
    )
};

export default ListView;
