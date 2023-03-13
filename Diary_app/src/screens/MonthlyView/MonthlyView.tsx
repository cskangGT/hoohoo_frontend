import styled from 'styled-components';
import React from 'react'
import {View} from 'react-native'
import { Calendar, CalendarList } from 'react-native-calendars';



const Background = styled(View)`
    width: 100%;
    height:100%;
    background-color: orange;
`;
const ContentContainer = styled(View)`
    width : 100%;
    height:100%;
    top : 15%;
`;
const DATA = [
     {
         id : "0", date: "2023-03-10", tags:["Jisan", "Lunch", "react", "computer"], 
         isPhoto:false, isDiary:false
     },
     {
         id : "1", date: "2023-03-20", tags:["homework", "Dinner", "Graphic Card", "Longterm"], 
         isPhoto:true, isDiary:true
     },
     {
         id : "2", date: "2023-03-23", tags:["Taehoon", "Lunch", "expo", "computer"], 
         isPhoto:true, isDiary:false
     },
     {
         id : "3", date: "2023-03-25", tags:["Jisan", "Dinner", "Graphic Card", "samsung"], 
         isPhoto:false, isDiary:true
     }
 ];
const theme = {backgroundColor: 'orange'};
const photo = {key: 'photo', color: 'red', selectedDotColor: 'blue'};
const tags = {key: 'tag', color: 'blue', selectedDotColor: 'blue'};
const diary = {key: 'diary', color: 'green'};
const MonthlyView = () => {

    let date: string[] = ["2023-03-10", '2023-03-20', '2023-03-23',"2023-03-25"];
    let customStyle : any = { dots: [] };
    let marked : any = {}
    DATA.forEach((item, index)=> {
        marked[date[index]] = [false, false, false];
        if (item.tags.length != 0) marked[date[index]][0] = true;
        if (item.isPhoto) marked[date[index]][1] = true;
        if (item.isDiary) marked[date[index]][2] = true;
    });
    const markedDates = date.reduce((acc : any, date : string) => {
        acc[date] = customStyle;
        console.log('acc', acc);
        if (!acc[date].dots.includes(tags) && marked[date][0]) acc[date].dots.push(tags);
        if (!acc[date].dots.includes(photo) && marked[date][1]) acc[date].dots.push(photo);
        if (!acc[date].dots.includes(diary) && marked[date][2]) acc[date].dots.push(diary);
        return acc;
    }, {});
    console.log('date', date)
 // design 적용 방식 수정, date를 어떻게 넣어줄건지 고민
 // 실질적인 디자인 고민, 추가적인 기능 생각

    return (<Background>
        <ContentContainer>
        <CalendarList
            horizontal= {true}
            pagingEnabled={true}
            markingType= {'multi-dot'}
            markedDates={markedDates}
            onDayPress={day => {
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
            />
        </ContentContainer>
    </Background>);
}
export default MonthlyView