import React from 'react'
import { Image, Text, ImageBackground, TouchableOpacity, View, ScrollView } from 'react-native'
import { TextDate, TextDateContainer } from './styles';

function DiaryDate(props: any): JSX.Element {
    //convert 2022-12-10 to 10 Dec 2022 format
    function formatDate(input: string): string {
        const date = new Date(input);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        };
        return date.toLocaleDateString('en-GB', options);
    }
    let output = formatDate(props.date);
    return (
        <TextDateContainer>
            <TextDate>{output}</TextDate>
        </TextDateContainer>
    )

}

export default DiaryDate