import styled from 'styled-components';
import React from 'react'
import { View, ImageBackground, Text, TouchableOpacity } from 'react-native'
import Calendar from './Calendar';
import CustomButton from '../../components/common/Button';
import { useState } from 'react';

const night = require('../../assets/Night3.png');
const Background = styled(ImageBackground)`
    width: 100%;
    height: 100%;
`;
const ContentContainer = styled(View)`
    width : 100%;
    height: 100%;
    top : 10%;
`;
const Grid = styled(View)`
    flex: 1;
    /* flex-direction: row; */
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-color: white;
    border-width: 1px;
`;
const GridItem = styled(Text)`
    width: 40%;
    text-align: center;
    padding: 5px;
    color: white;
`;
const SelectorContainer = styled(View)`
    flex-direction: row;
`;
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
// const Calendar = () => {
//     const [isModalVisible, setModalVisible] = useState(false);
//     const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//     const toggleModal = () => {
//         setModalVisible(!isModalVisible);
//     };

//     const months = [
//         { label: 'January', value: 1 },
//         { label: 'February', value: 2 },
//         { label: 'March', value: 3 },
//         { label: 'April', value: 4 },
//         { label: 'May', value: 5 },
//         { label: 'June', value: 6 },
//         { label: 'July', value: 7 },
//         { label: 'August', value: 8 },
//         { label: 'September', value: 9 },
//         { label: 'October', value: 10 },
//         { label: 'November', value: 11 },
//         { label: 'December', value: 12 },
//     ];

//     const years = generatePickerItems(1900, 2100);

//     return (
//         <View>
//             {/* Your calendar component */}
//             <Text>
//                 Selected Month and Year: {selectedMonth}/{selectedYear}
//             </Text>
//             <Button title="Change Month and Year" onPress={toggleModal} />

//             <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
//                 <View style={{ backgroundColor: 'white', padding: 20 }}>
//                     <Text style={{ marginBottom: 10 }}>Select Month and Year</Text>
//                     <RNPickerSelect
//                         onValueChange={(value) => setSelectedMonth(value)}
//                         items={months}
//                         value={selectedMonth}
//                         placeholder={{ label: 'Select a month...', value: null }}
//                     />
//                     <RNPickerSelect
//                         onValueChange={(value) => setSelectedYear(value)}
//                         items={years}
//                         value={selectedYear}
//                         placeholder={{ label: 'Select a year...', value: null }}
//                     />
//                     <Button title="Close" onPress={toggleModal} />
//                 </View>
//             </Modal>
//         </View>
//     );
// };

const MonthlyView = ({ navigation }: any) => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const onSelectMonth = (index: number) => {
        setSelectedMonth(index + 1);
    };

    const onSelectYear = (year: number) => {
        setSelectedYear(year);
    };

    const renderMonthGrid = () => {

        return (
            <Grid>
                {months.map((month, index) => (
                    <TouchableOpacity key={month} onPress={() => onSelectMonth(index)}>
                        <GridItem> {month} </GridItem>
                    </TouchableOpacity>
                ))}
            </Grid>
        );
    };

    const renderYearGrid = () => {
        const currentYear: number = new Date().getFullYear();
        const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);

        return (
            <Grid>
                {years.map((year) => (
                    <TouchableOpacity key={year} onPress={() => onSelectYear(year)}>
                        <GridItem>{String(year)}</GridItem>
                    </TouchableOpacity>
                ))}
            </Grid>
        );
    };


    // const [days, setDays] = React.useState<Day[]>([]);
    // let dates: string[] = ["2023-03-10", '2023-03-20', '2023-03-23', "2023-03-25"];
    // let customStyle: any = { dots: [] };
    // let marked: any = {};
    // DATA.forEach((item, index) => {
    //     marked[dates[index]] = [false, false, false];
    //     if (item.tags.length != 0) marked[dates[index]][0] = true;
    //     if (item.isPhoto) marked[dates[index]][1] = true;
    //     if (item.isDiary) marked[dates[index]][2] = true;
    // });
    // const markedDates = dates.reduce((acc: any, date: string) => {

    //     acc[date] = { dots: [] };
    //     console.log('marked', marked);
    //     console.log('date', date);
    //     console.log('acc', acc);
    //     if (!acc[date].dots.includes(tags) && marked[date][0]) acc[date].dots.push(tags);
    //     console.log('acc[date].dots', acc[date].dots);
    //     if (!acc[date].dots.includes(photo) && marked[date][1]) acc[date].dots.push(photo);
    //     if (!acc[date].dots.includes(diary) && marked[date][2]) acc[date].dots.push(diary);
    //     return acc;
    // }, {});

    // design 적용 방식 수정, date를 어떻게 넣어줄건지 고민
    // 실질적인 디자인 고민, 추가적인 기능 생각

    return (<Background source={night}>
        <CustomButton
            title="< Diary List"
            onPress={() => navigation.navigate('ListView')}
            style={{ marginLeft: 10, marginRight: 0, top: '4%' }}
            backgroundColor='transparent'
            width="25%"
            textStyle={{ color: "white" }}
        />

        <ContentContainer>
            <Calendar />
        </ContentContainer>

        {/* <ContentContainer>

            
            <SelectorContainer>
                {renderMonthGrid()}
                {renderYearGrid()}
                {/* <Month onSelectMonth={setSelectedMonth} />

            </SelectorContainer>
        </ContentContainer> */}
    </Background>);
}
export default MonthlyView