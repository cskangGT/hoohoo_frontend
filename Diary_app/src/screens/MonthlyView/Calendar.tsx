import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, TextInput } from 'react-native';
import styled from 'styled-components';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { format } from 'date-fns';
// import Button from './../../components/common/Button';
const star1 = require('../../assets/star1.png');
const star2 = require('../../assets/star2.png');
const star3 = require('../../assets/star3.png');
const star4 = require('../../assets/star4.png');
const moment = require('moment');
const SearchContainer = styled(View)`
    /* justify-content: center; */
    background-color: transparent;
    width : 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 7%;
`;
const MonthInput = styled(TextInput)`
    flex: 1 10%;
    font-size: 30px;
    width: 20%;
    font-weight: bold;
    color : white;
    background-color: transparent;
    padding-left:30%;
`;
const YearInput = styled(TextInput)`
    flex: 1 15%;
    font-size: 30px;
    padding-right: 30%;
    width:20%;
    font-weight: bold;
    color : white;
    background-color: transparent;
    align-items: center;
`;

const Row = styled(View)`
    
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-left: 13px;
    padding-right: 13px;
    padding-bottom: 13px;
`;

const Element = styled(TouchableOpacity)`
    flex: 1;
    height: 50px;
    font-weight: bold;
    background-color: transparent;
    color : white;
    /* padding-top: 10px; */
    /* border-width: 1px;
    border-color : skyblue; */
`;
const Day = styled(Text)`
    font-size: 13px;
    text-align: center;
    color : white;
`;
const Today = styled(View)`
    border-width: 1px;
    border-color : skyblue;
    border-radius: 5px;
    height: 100%;
`
const Star = styled(Image)`
    width: 20px;
    margin-left : 15px;
`;

const DateText = styled(Text)`
    color: white;
    font-size: 20px;
    text-align: center;

`;
const DATA = [
    {
        id: "0", date: "2023-04-10", tags: ["Jisan", "Lunch", "react", "computer"],
        isPhoto: false, isDiary: false
    },
    {
        id: "1", date: "2023-04-14", tags: ["homework", "Dinner", "Graphic Card", "Longterm"],
        isPhoto: true, isDiary: true
    },
    {
        id: "2", date: "2023-04-03", tags: ["Taehoon", "Lunch", "expo", "computer"],
        isPhoto: true, isDiary: false
    },
    {
        id: "3", date: "2023-04-25", tags: ["Jisan", "Dinner", "Graphic Card", "samsung"],
        isPhoto: false, isDiary: true
    }
];
// global state management required.

const FadeStar = ({ starImage, frequency }: { starImage: any, frequency: number }) => {
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 1, duration: 10000 / frequency, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 10000 / frequency, useNativeDriver: true })
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={{ opacity }}>
            <Star source={starImage} />
        </Animated.View>
    );
};
const MyCalendar = () => {


    const months = ["Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const weekDays = ["Su", "M", "T", "W", "Th", "F", "Sa"];
    const nDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const arr_star = [star1, star2, star3, star4];
    const [date, setDate] = useState<Date>(new Date());
    const [isTransitioning, setIsTransitioning] = useState(false);
    // const fadeAnim = useRef(new Animated.Value(0)).current;
    const [month_text, setMonth_text] = useState<string>(months[date.getMonth()]);
    const [year_text, setYear_text] = useState<string>(String(date.getFullYear()));

    const changeMonth = (n: any) => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + n);
            setMonth_text(months[newDate.getMonth()]);
            setYear_text(String(newDate.getFullYear()));
            return newDate;
        });
        // setMonth_text(months[date.getMonth()]);
        // setYear_text(String(date.getFullYear()));
    }

    // useEffect(() => {
    //     const fadeIn = Animated.timing(fadeAnim, {
    //         toValue: 1,
    //         duration: 2500,
    //         useNativeDriver: true,
    //     });

    //     const fadeOut = Animated.timing(fadeAnim, {
    //         toValue: 0,
    //         duration: 1000,
    //         useNativeDriver: true,
    //     });

    //     const sequence = Animated.sequence([fadeIn, fadeOut]);

    //     Animated.loop(sequence).start();
    // }, [fadeAnim]);

    const onGestureEvent = (event: any) => {
        const { translationX, velocityX } = event.nativeEvent;
        const monthOffset = Math.round(translationX / -320);
        if (!isTransitioning && monthOffset !== 0) {
            setIsTransitioning(true);
            if (monthOffset < 0) {
                changeMonth(-1);
            } else if (monthOffset > 0) {
                changeMonth(+1);
            }
        }
    };

    const onHandlerStateChange = (event: any) => {
        const { state } = event.nativeEvent;
        if (state === State.END) {
            setIsTransitioning(false);
        }
    };
    let rows = [];
    function generateMatrix() {
        const matrix: any[] = [];
        // The following code creates the header 
        matrix[0] = weekDays;
        // The remaining code will go here 
        const year: number = date.getFullYear();
        const month: number = date.getMonth();
        const firstDay: number = new Date(year, month, 1).getDay();
        let maxDays: number = nDays[month];
        if (month == 1) { // February
            if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                maxDays += 1;
            }
        }
        let counter: number = 1;
        for (let row = 1; row < 7; row++) {
            matrix[row] = [];
            for (let col = 0; col < 7; col++) {
                matrix[row][col] = -1;
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month 
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than 
                    // the number of days in the month 
                    matrix[row][col] = counter++;
                }
            }
        }
        return matrix;
    }

    // function getParsedDate(date: Date) {
    //     const formatDate = format(new Date(), 'yyyy-MM-dd');

    //     return formatDate;
    // }

    let y_data: string;
    let m_data: string;
    // Extract date data 
    // select which month and year user wants to see.
    const data_date: number[] = [];
    for (let i = 0; i < DATA.length; i++) {
        let str: string = DATA[i].date;
        let date_split: string[] = str.split('-');
        y_data = date_split[0]; // yyyy
        m_data = date_split[1]; // mm
        data_date.push(parseInt(date_split[2]));
    }
    const curr_date = moment().format('YYYY-MM-DD');
    let curr_split: string[] = curr_date.split("-");
    let curr_yyyy: string = curr_split[0];
    let curr_mm: number = parseInt(curr_split[1]);
    let curr_dd: number = parseInt(curr_split[2]);

    const handlerElement = (item: number) => {
        let index: number = Math.floor(Math.random() * 4);
        // item is day number. year and month is already stored
        console.log("curr_dd", curr_dd);
        console.log("date.getMonth()", date.getMonth());
        console.log("curr_yyyy", year_text);
        if (item == curr_dd && year_text == curr_yyyy && curr_mm == (date.getMonth() + 1)) {
            if (data_date.includes(item)) { // if the diary is in database
                console.log("curr_dd", curr_dd);
                console.log("curr_mm", curr_mm);
                console.log("curr_yyyy", curr_yyyy);
                return ( // if in database
                    <Today>
                        <Day> {item != -1 ? item : ''} </Day>
                        <FadeStar starImage={arr_star[index]} frequency={index + 1} />
                    </Today>);
            } else {

                return ( // if not in database
                    <Today>
                        <Day> {item != -1 ? item : ''} </Day>
                    </Today>);
            }

        }
        else if (y_data == year_text && months[parseInt(m_data) - 1] == month_text) {
            if (data_date.includes(item)) { // if the diary is in database
                console.log("dd", item);
                console.log("mm", month_text);
                console.log("yyyy", y_data);
                return ( // if in database
                    <View>
                        <Day> {item != -1 ? item : ''} </Day>
                        <FadeStar starImage={arr_star[index]} frequency={index + 1} />
                    </View>);
            } else {

                return ( // if not in database
                    <View>
                        <Day> {item != -1 ? item : ''} </Day>
                    </View>);
            }
        } else {
            return ( // if not in database
                <View>
                    <Day> {item != -1 ? item : ''} </Day>
                </View>);
        }


    }

    const matrix = generateMatrix();
    rows = matrix.map((row, rowIndex) => {
        let rowItems = row.map((item: any, colIndex: number) => {
            if (rowIndex == 0) {
                return (<DateText>
                    {item != -1 ? item : ''}
                </DateText>);
            } else {
                return (
                    <Element
                        onPress={() => console.log('item', item)}>
                        {handlerElement(item)}
                    </Element>
                );
            }
        });
        return (
            <Row>
                {rowItems}
            </Row>
        );
    });

    const handleSubmit = () => { // setting month
        let m: number = months.indexOf(month_text);
        let y: number = parseInt(year_text);
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(m);
            newDate.setFullYear(y);
            return newDate;
        });

    }
    return (

        <View>
            <PanGestureHandler onGestureEvent={onGestureEvent}
                minDeltaX={10}
                activeOffsetX={[-20, 20]}
                onHandlerStateChange={onHandlerStateChange}>

                <View>
                    <SearchContainer>
                        <MonthInput allowFontScaling={true}
                            value={month_text}
                            maxLength={3}
                            onChangeText={setMonth_text}
                            placeholder={months[date.getMonth()]}
                            placeholderTextColor={'white'}
                            onSubmitEditing={handleSubmit}
                        />
                        <YearInput allowFontScaling={true}
                            placeholder={String(date.getFullYear())}
                            value={year_text}
                            maxLength={4}
                            onChangeText={setYear_text}
                            placeholderTextColor={'white'}
                            keyboardType="numeric"
                            onSubmitEditing={handleSubmit}
                        />
                    </SearchContainer>
                    {rows}
                </View>

            </PanGestureHandler >
        </View>

    );


}
export default MyCalendar