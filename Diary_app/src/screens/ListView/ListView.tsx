
import React, { useState } from 'react'
import { View, FlatList, TextInput, ImageBackground } from 'react-native';
import styled from 'styled-components';
import ViewItem from '../../components/common/ViewItem';

const bg = require('../../assets/Night3.png');
const SafeAreaView = styled(ImageBackground)`
    
    /* margin-top: 100px; // 헤더로부터 100px아래부터 백그라운드 시작 */
    width: 100%;
    height:100%;
`;
const SearchArea = styled(View)`
    height: 15%;
`;
const SearchBar = styled(TextInput)`
    height: 30%;
    border-radius: 13px;
    background-color: white;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20%;
    padding-left: 12px;
`;

const Container = styled(View)`
    flex-direction: row;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    height: 80%;
    padding: 10px;
    background-color: transparent ;
    border-radius: 30px;
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


const ListView = () => {
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
