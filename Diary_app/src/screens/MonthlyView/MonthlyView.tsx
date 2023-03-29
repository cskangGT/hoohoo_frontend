import styled from 'styled-components';
import React, { useState } from 'react'
import { View, Text, ImageBackground } from 'react-native'
// import { Calendar, CalendarList } from 'react-native-calendars';
// import { TimeDatePicker, Modes } from "react-native-time-date-picker";
import DatePicker, { DayValue, DayRange, Day } from 'react-modern-calendar-datepicker'
import moment from 'moment';
import MyCalendar from './Calendar';
const night = require('../../assets/Night3.png');
const Background = styled(ImageBackground)`
    width: 100%;
    height: 100%;
    
`;
const ContentContainer = styled(View)`
    width : 100%;
    height:100%;
    top : 15%;
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
const theme = { backgroundColor: 'orange' };
const photo = { key: 'photo', color: 'red', selectedDotColor: 'blue' };
const tags = { key: 'tag', color: 'blue', selectedDotColor: 'blue' };
const diary = { key: 'diary', color: 'green' };
const now = moment(); // create a moment object with current date and time
const currentDate = parseInt(now.format('DD')); // get the current date as a two-digit number
const currentMonth = parseInt(now.format('MM')); // get the current month as a two-digit number
const currentYear = parseInt(now.format('YYYY'));
const MonthlyView = () => {
    const [day, setDay] = React.useState<DayValue>({ year: currentYear, month: currentMonth, day: currentDate });
    const [dayRange, setDayRange] = React.useState<DayRange>({
        from: null,
        to: null
    });
    const [days, setDays] = React.useState<Day[]>([]);
    let dates: string[] = ["2023-03-10", '2023-03-20', '2023-03-23', "2023-03-25"];
    // let customStyle : any = { dots: [] };
    let marked: any = {};
    DATA.forEach((item, index) => {
        marked[dates[index]] = [false, false, false];
        if (item.tags.length != 0) marked[dates[index]][0] = true;
        if (item.isPhoto) marked[dates[index]][1] = true;
        if (item.isDiary) marked[dates[index]][2] = true;
    });
    const markedDates = dates.reduce((acc: any, date: string) => {

        acc[date] = { dots: [] };
        console.log('marked', marked);
        console.log('date', date);
        console.log('acc', acc);
        if (!acc[date].dots.includes(tags) && marked[date][0]) acc[date].dots.push(tags);
        console.log('acc[date].dots', acc[date].dots);
        if (!acc[date].dots.includes(photo) && marked[date][1]) acc[date].dots.push(photo);
        if (!acc[date].dots.includes(diary) && marked[date][2]) acc[date].dots.push(diary);
        return acc;
    }, {});
    console.log('dates', dates)
    console.log('markedDates', markedDates)
    // design 적용 방식 수정, date를 어떻게 넣어줄건지 고민
    // 실질적인 디자인 고민, 추가적인 기능 생각

    return (<Background source={night}>
        <ContentContainer>
            {/* <DatePicker value={day} onChange={setDay} />
            <DatePicker value={dayRange} onChange={setDayRange} />
            <DatePicker value={days} onChange={setDays} /> */}

            <MyCalendar />
            {/* <CalendarList
            horizontal= {true}
            pagingEnabled={true}
            markingType= {'multi-dot'}
            markedDates={markedDates}
            onDayPress= {day => {
                console.log('selected day:', day)
            }}
            theme={{
                calendarBackground: '#ffecc4',
                textMonthFontWeight: 'bold',
                todayTextColor: '#615efc',
                'stylesheet.calendar.header': {
                    dayTextAtIndex0: {
                    color: 'red'
                    },
                    dayTextAtIndex6: {
                    color: 'blue'
                    }
                }
            }}
            /> */}
        </ContentContainer>
    </Background>);
}
export default MonthlyView