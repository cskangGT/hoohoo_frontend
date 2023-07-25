import React from 'react'
import { TextDate, TextDateContainer } from './styles';

function DiaryDate(props: any): JSX.Element {
    //convert 2022-12-10 to 10 Dec 2022 format
    function formatDate(input: string): string {
        const date = new Date(input);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        };
        return utcDate.toLocaleDateString('en-GB', options);
    }
    let output = formatDate(props.date);
    
    return (
        <TextDateContainer>
            <TextDate>{output}</TextDate>
        </TextDateContainer>
    )

}

export default DiaryDate