import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, TextInput, Modal } from 'react-native';
import styled from 'styled-components';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import CalendarModal from './CalendarModal';
import CustomButton from '../../components/common/Button';
import { useNavigation } from '@react-navigation/native';
import data from '../../data/data.json'
// import Button from './../../components/common/Button';
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekDays = ["Su", "M", "T", "W", "Th", "F", "Sa"];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const gemImages = [require('../../assets/droplet_gem1.png'), require('../../assets/droplet_gem2.png'), require('../../assets/droplet_gem3.png'),
require('../../assets/droplet_gem4.png'), require('../../assets/droplet_gem5.png'), require('../../assets/droplet_gem6.png'),
require('../../assets/droplet_gem7.png'), require('../../assets/droplet_gem8.png'), require('../../assets/droplet_gem9.png'),
require('../../assets/droplet_gem10.png'), require('../../assets/droplet_gem11.png'), require('../../assets/droplet_gem12.png')];

const moment = require('moment');
const SearchContainer = styled(View)`
    /* justify-content: center; */
    background-color: transparent;
    width : 100%;
    display: flex;
    flex-direction: row;
    padding-bottom: 7%;
`;

const Row = styled(View)`
    column-width: 13%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-left: 13px;
    padding-right: 13px;
    padding-bottom: 13px;
`;
const Blank = styled(View)`
    width: 14.4%;
    height: 50px;
    background-color: transparent;
    
`;
const OtherElement = styled(View)`
    flex:1;
    height: 50px;
    background-color: transparent;
`;
const Element = styled(TouchableOpacity)`
    flex:1;
    
    height: 50px;
    font-weight: bold;
    background-color: transparent;
    color : white;
    /* padding-top: 10px; */
    
    /* border-color : #ebd987; */
    /* align-items: center; */
`;
const Day = styled(Text)`
/* border-width: 1px;
    border-color : red; */
    font-size: 14px;
    text-align: center;
    color : white;
`;
const Today = styled(View)`
    border-width: 1px;
    height: 50px;
    border-color : skyblue;
    border-radius: 5px;
`;
const DayContainer = styled(View)`
    border-radius: 5px;
    
`;
const Star = styled(Image)`
    width: 14px;
    height: 22px;
    margin-top: 5px;
    align-self: center;
`;

const DateText = styled(Text)`
    color: white;
    margin-bottom: 5%;
    font-size: 20px;
    text-align: center;

`;
const DATA: any = data;
// global state management required.

const FadeStar = ({ gemImage, frequency }: { gemImage: any, frequency: number }) => {
    const [opacity] = useState(new Animated.Value(0));
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacity, { toValue: 0.8, duration: 10000 / frequency, useNativeDriver: true }),
                Animated.timing(opacity, { toValue: 0, duration: 10000 / frequency, useNativeDriver: true })
            ])
        ).start();
    }, []);

    return (
        <Animated.View style={{ opacity }}>
            <Star source={gemImage} />
        </Animated.View>
    );
};
const Calendar = () => {
    const navigation = useNavigation();
    const [date, setDate] = useState<Date>(new Date());
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [month_text, setMonth_text] = useState<string>(months[date.getMonth()]);
    const [year_text, setYear_text] = useState<string>(String(date.getFullYear()));
    const changeDate = (direction:number) => {
        setIsTransitioning(true);
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(newDate.getMonth() + direction);
            setMonth_text(months[newDate.getMonth()]);
            setYear_text(String(newDate.getFullYear()));
            return newDate;
        });
    };

    // Handle swipe gestures
    const onGestureEvent = (event :any) => {
        const { translationX } = event.nativeEvent;
        const monthOffset = Math.round(translationX / -320);
        if (!isTransitioning && monthOffset !== 0) {
            changeDate(monthOffset);
        }
    };

    const onHandlerStateChange = (event:any) => {
        const { state } = event.nativeEvent;
        if (state === State.END) {
            setIsTransitioning(false);
        }
    };
    // const changeMonth = (n: any) => {
    //     setDate(prevDate => {
    //         const newDate = new Date(prevDate);
    //         newDate.setMonth(newDate.getMonth() + n);
    //         setMonth_text(months[newDate.getMonth()]);
    //         setYear_text(String(newDate.getFullYear()));
    //         return newDate;
    //     });
    //     console.log("changed month", date);
        
    // }

    // const onGestureEvent = (event: any) => {
    //     const { translationX, velocityX } = event.nativeEvent;
    //     const monthOffset = Math.round(translationX / -320);
    //     if (!isTransitioning && monthOffset !== 0) {
    //         setIsTransitioning(true);
    //         if (monthOffset < 0) {
    //             changeMonth(-1);
    //         } else if (monthOffset > 0) {
    //             changeMonth(+1);
    //         }
    //     }
    // };

    // const onHandlerStateChange = (event: any) => {
    //     const { state } = event.nativeEvent;
    //     if (state === State.END) {
    //         setIsTransitioning(false);
    //     }
    // };
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
                if (row == 1 && col >= firstDay) {
                    // Fill in rows only after the first day of the month 
                    matrix[row][col] = counter++;
                } else if (row > 1 && counter <= maxDays) {
                    // Fill in rows only if the counter's not greater than 
                    // the number of days in the month 
                    matrix[row][col] = counter++;
                } else {
                    matrix[row][col] = ''
                }
            }
        }
        return matrix;
    }
    const data_date = data.map(item => parseInt(item.date.split('-')[2]));
    const matrix = generateMatrix();
    rows = matrix.map((row, rowIndex) => {
        const rowItems = row.map((item, colIndex) => {
            const key = `cell_${rowIndex}_${colIndex}`;
            const isHeader = rowIndex === 0;
            const isBlank = item === '';
            const isDataDate = data_date.includes(item);
            const isToday = new Date().getDate() === item && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();

            const onPress = () => {
                if (!isBlank && !isHeader) {
                    if (item != -1) {
                        
                        let data_inverse : any = { "16": "0", "17": "1", "18": "2",
                         "1": "3","2": "4", "3": "5", "6": "6", "7": "7",
                         "8": "8", "9": "9", "11": "10", "25": "11" }
                        navigation.navigate('DiaryDetail', { index: data_inverse[item], date: `${date.getFullYear()}-${date.getMonth() + 1}-${item}` })
                    }
                }
            };

            const gemImageIndex = Math.floor(Math.random() * gemImages.length);
            const content = isDataDate ? (
                <>
                    <Day>{item}</Day>
                    <FadeStar gemImage={gemImages[gemImageIndex]} frequency={Math.floor(Math.random() * 3 + 1)} />
                </>
            ) : (
                <Day>{item}</Day>
            );

            const ElementContent = isBlank ? <Blank /> : isHeader ? <DateText>{item}</DateText> : isToday ? <Today>{content}</Today> : <DayContainer>{content}</DayContainer>;

            return isBlank || isHeader ? (
                <OtherElement key={key}>
                    {ElementContent}
                </OtherElement>
            ) : (
                <Element key={key} onPress={onPress}>
                    {ElementContent}
                </Element>
            );
        });

        return <Row key={rowIndex}>{rowItems}</Row>;
    });
    const onMonthYearChange = (mm: number, yyyy: string) => {
        setDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setFullYear(parseInt(yyyy));
            newDate.setMonth(mm);
            setMonth_text(months[newDate.getMonth()]);
            setYear_text(String(newDate.getFullYear()));
            return newDate;
        });
    }
    return (
        <View>
            <PanGestureHandler onGestureEvent={onGestureEvent} minDeltaX={10} activeOffsetX={[-20, 20]} onHandlerStateChange={onHandlerStateChange}>
                <View>
                    <SearchContainer>
                        <CalendarModal date={date} onMonthYearChange={onMonthYearChange} />
                    </SearchContainer>
                    {rows}
                </View>
            </PanGestureHandler>
        </View>
    );
}
export default Calendar