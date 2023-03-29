import React from 'react';
import { View } from 'react-native';
import Month from './Month';
import styled from 'styled-components';
interface Props {
    currentYear: number,
    months: number[],
    styles: any,
    onSelectMonth: any,
    textStyle: any,
    minDate: any,
    maxDate: any,
}

const Wrapper = styled(View)`
    align-self: center;
    justify-content: center;
    width : 100%;
`;

const Row = styled(View)`
    flex-direction: row;
    padding: 20px;
`;

export default function MonthsGridView(props: Props) {
    const {
        currentYear,
        months,
        styles,
        onSelectMonth,
        textStyle,
        minDate,
        maxDate,
    } = props;
    const _months = Array.from(Array(12).keys());
    const columnArray = [0, 1, 2];
    const rowArray = [0, 1, 2, 3];


    function generateColumns() {
        const column = columnArray.map(index => {
            const currentMonth = _months.shift();
            return (
                <Month
                    key={currentMonth + index}
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    months={months}
                    styles={styles}
                    onSelectMonth={onSelectMonth}
                    minDate={minDate}
                    maxDate={maxDate}
                    textStyle={textStyle}
                />
            );
        });
        return column;
    }

    return (
        <Wrapper>
            {rowArray.map(index => (
                <Row key={index}>
                    {generateColumns()}
                </Row>
            ))
            }
        </Wrapper>
    );
}
