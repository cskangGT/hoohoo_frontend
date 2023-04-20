
import React, { useState } from 'react'
import { View, FlatList, TextInput, ImageBackground, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';
import ViewItem from '../../components/common/ViewItem';

const bg = require('../../assets/Background.png');
const SafeAreaView = styled(ImageBackground)`
    
    /* margin-top: 100px; // 헤더로부터 100px아래부터 백그라운드 시작 */
    width: 100%;
    height:100%;
`;
const SearchArea = styled(View)`
    top:7%;
    height: 15%;
`;
const SearchBar = styled(TextInput)`
    height: 30%;
    border-radius: 13px;
    background-color: white;
    
    margin-left: 5%;
    margin-right: 5%;
    padding-left: 12px;
    opacity: 0.9;
`;

const Container = styled(View)`

    flex-direction: row;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    height: 80%;
    padding: 5px;
    padding-top: -5px;
    background-color: transparent ;
    border-radius: 30px;
`;
const NavContainer = styled(View)`

    top:6%;
    width: 84%;
    align-items: flex-end;
    margin-right:8%;
    margin-left: 8%;
`;
const ButtontoMonth = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: white;
    border-radius: 10px;
    padding:5px;
`;
const ButtonText = styled(Text)`
    color: white;
    font-size:15px;
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
        id: "0", date: "2/10/2022", tags: ["Jisan", "Lunch", "react", "computer"],
        isPhoto: false, isQuote: false, isDiary: false
    },
    {
        id: "1", date: "2/15/2022", tags: ["homework", "Dinner", "Graphic Card", "Longterm"],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "2", date: "1/10/2023", tags: ["Taehoon", "Lunch", "expo", "computer"],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "3", date: "5/13/2022", tags: ["Jisan", "Dinner", "Graphic Card", "samsung"],
        isPhoto: true, isQuote: true, isDiary: true
    }
];


const ListView = ({ navigation, route }: any) => {
    // This is rendering callback function. It shows every item view.
    const renderItem = ({ item }: { item: ItemData }) => {
        console.log('Viewitem', item);
        return <ViewItem item={item} />;
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

    // const filteredData = DATA.filter(item => {1
    //     const query = searchQuery.toLowerCase();
    //     const tags = item.tags.join(' ').toLowerCase();
    //     return tags.includes(query);
    //     });
    // console.log('filteredData', filteredData)
    // useEffect(()=> {
    //     console.log('filteredData', filteredData)
    //     console.log('query',searchQuery);
    // }, [list]);
    return (
        <SafeAreaView source={bg}>
            <NavContainer>
                <ButtontoMonth onPress={() => {
                    console.log("nav");
                    navigation.navigate('MonthlyView')
                }}>
                    <ButtonText>Monthly</ButtonText>
                </ButtontoMonth>
            </NavContainer>
            <SearchArea>
                <SearchBar
                    onChangeText={handleSearch}
                    value={searchQuery}
                    placeholder="Search by tags"
                />
            </SearchArea>

            <Container>
                {list}
            </Container>

        </SafeAreaView>
    )
};

export default ListView;
