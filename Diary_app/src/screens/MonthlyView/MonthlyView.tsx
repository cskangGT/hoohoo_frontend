import styled from 'styled-components';
import React from 'react'
import { View, ImageBackground, Text, TouchableOpacity, Platform } from 'react-native'
import Calendar from './Calendar';
import CustomButton from '../../components/common/Button';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const shape = require('../../assets/DiaryEditPage/shape.png');
const Background = styled(ImageBackground)`
    width: 100%;
    height: 100%;
    opacity: 1;
    flex:1;
`;
const Shape = styled(ImageBackground)`
  flex:1;
  /* border-width: 1px;
  border-color: white; */
  
`;
const ContentContainer = styled(View)`
    width : 100%;
    /* border-width: 1px;
  border-color: white; */
    margin-top: 20%;
`;
// const Grid = styled(View)`
//     flex: 1;
//     /* flex-direction: row; */
//     flex-wrap: wrap;
//     align-items: center;
//     justify-content: center;
//     border-color: white;
//     border-width: 1px;
// `;
// const GridItem = styled(Text)`
//     width: 40%;
//     text-align: center;
//     padding: 5px;
//     color: white;
// `;
const ButtonContainer = styled(View)`
  position: absolute;
  bottom: 2%;
  right: 6%;
  width: 100%;
  align-items: flex-end;
`;
const ButtontoList = styled(TouchableOpacity)`
    width:15%;
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
// const SelectorContainer = styled(View)`
//     flex-direction: row;
// `;
const DATA = [
    {
        id: "0", date: "2023-03-10", tags: ["Jisan", "Lunch", "react", "computer"],
        isPhoto: false, isDiary: false
    },
    {
        id: "1", date: "2023-03-20", tags: ["homework", "Dinner", "Graphic Card", "Longterm"],
        isPhoto: true, isDiary: true
    },
    {
        id: "2", date: "2023-03-23", tags: ["Taehoon", "Lunch", "expo", "computer"],
        isPhoto: true, isDiary: false
    },
    {
        id: "3", date: "2023-03-25", tags: ["Jisan", "Dinner", "Graphic Card", "samsung"],
        isPhoto: false, isDiary: true
    }
];

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];
// const theme = { backgroundColor: 'orange' };
// const photo = { key: 'photo', color: 'red', selectedDotColor: 'blue' };
// const tags = { key: 'tag', color: 'blue', selectedDotColor: 'blue' };
// const diary = { key: 'diary', color: 'green' };
// const now = moment(); // create a moment object with current date and time
// const currentDate = parseInt(now.format('DD')); // get the current date as a two-digit number
// const currentMonth = parseInt(now.format('MM')); // get the current month as a two-digit number
// const currentYear = parseInt(now.format('YYYY'));
// function Month(props: any): JSX.Element {


//     return (
//         <Grid >
//             {
//                 months.map((month, index) => (
//                     <TouchableOpacity key={month} onPress={() => props.onSelectMonth(index)}>
//                         <Text> {month} </Text>
//                     </TouchableOpacity>
//                 ))
//             }
//         </Grid>
//     )
// }

const MonthlyView = ({ navigation }: any) => {
    // const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    // const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    // const onSelectMonth = (index: number) => {
    //     setSelectedMonth(index + 1);
    // };

    // const onSelectYear = (year: number) => {
    //     setSelectedYear(year);
    // };

    // const renderMonthGrid = () => {

    //     return (
    //         <Grid>
    //             {months.map((month, index) => (
    //                 <TouchableOpacity key={month} onPress={() => onSelectMonth(index)}>
    //                     <GridItem> {month} </GridItem>
    //                 </TouchableOpacity>
    //             ))}
    //         </Grid>
    //     );
    // };

    // const renderYearGrid = () => {
    //     const currentYear: number = new Date().getFullYear();
    //     const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

    //     return (
    //         <Grid>
    //             {years.map((year) => (
    //                 <TouchableOpacity key={year} onPress={() => onSelectYear(year)}>
    //                     <GridItem>{String(year)}</GridItem>
    //                 </TouchableOpacity>
    //             ))}
    //         </Grid>
    //     );
    // };


    // design 적용 방식 수정, date를 어떻게 넣어줄건지 고민
    // 실질적인 디자인 고민, 추가적인 기능 생각

    return (<View style={{backgroundColor: 'black', flex:1}} >
        <SafeAreaView  style={{flex:1}}>
        <Shape source={shape} resizeMode='cover'>
        
        <ContentContainer>
            <Calendar />
        </ContentContainer>
        <ButtonContainer>
        <ButtontoList onPress={() => {
                    console.log("pressed");
                    navigation.navigate('ListView');
                }}>
                    <ButtonText>List </ButtonText>
                    <Icon name="arrow-forward-ios" color={'#fcf5f5'}/>
                </ButtontoList>
        {/* <CustomButton
            title="List"
            onPress={() => navigation.navigate('ListView')}
            style={{ marginLeft: 20, marginRight: 20 }}
            backgroundColor='transparent'
            width="25%"
            textStyle={{ color: "white" }}
        /> */}
        </ButtonContainer>
        
        </Shape>
        </SafeAreaView>
    </View>);
}
export default MonthlyView