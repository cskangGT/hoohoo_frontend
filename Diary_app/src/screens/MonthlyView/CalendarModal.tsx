import React, { useState, useEffect } from 'react';
import { View, TextInput } from 'react-native';
import Modal from 'react-native-modal';

import styled from 'styled-components';
import CustomButton from '../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
interface Props {
    date: Date;
    onMonthYearChange: (mm: number, yyyy: string) => any;
}
const ButtonModal = styled(CustomButton)`
    background-color: transparent;
    width:45%;
    margin-left:27.5%;
`;
const ModalContainer = styled(View)`
    background-color: 'rgba(107, 106, 106, 0.5)';
    
    height:50%;
    padding:5%;
    margin: 5%;
    border-radius: 20px;
    box-shadow: 2px 2px 5px black;
`;
const YearInput = styled(TextInput)`
    font-size: 20px;
    font-weight: bold;
    color : white;
    background-color: transparent;
    min-width: 100px;
    text-align: center;
`;
const ModalHeader = styled(View)`
    flex-direction: row;
    border-bottom-color: white;
    border-bottom-width: 2px;
    padding:3%;
    width: 100%;
    align-items: center;
    justify-content: space-between;
`;
const Months = styled(View)`
/* border-width:1px;
border-color: white; */
    flex-direction:row;
    flex-wrap: wrap;
    margin: 5%;
    height: 80%;
`;
const MonthItem = styled(CustomButton)`
    width: 30%;
    height: 23%;
    margin: 3px;
    align-items: center;
`;
const CalendarModal = (props: Props) => {
    const { date, onMonthYearChange } = props;
    console.log('what I want to check', date);
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<number>(date.getMonth());
    const [selectedYear, setSelectedYear] = useState<string>(String(date.getFullYear()));

    useEffect(() => {
        setSelectedMonth(date.getMonth());
        setSelectedYear(String(date.getFullYear()));
    }, []);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    console.log("selectedYear", selectedYear);
    console.log("selectedMonth", selectedMonth);
    const onSelectYear = (val: number) => {
        let selectorStartingYear = 1900;
        let selectorEndingYear = 2100;
        let y = parseInt(selectedYear) + val;
        if (y > selectorEndingYear) {
            y = selectorEndingYear;
        } else if (y < selectorStartingYear) {
            y = selectorStartingYear;
        }
        setSelectedYear(String(y));
    };
    const onChangeYear = (text: string) => {
        if (Number(parseInt(text))) {
            setSelectedYear(text);
        }
    };
    const months = [
        { label: 'Jan', value: 1 },
        { label: 'Feb', value: 2 },
        { label: 'Mar', value: 3 },
        { label: 'Apr', value: 4 },
        { label: 'May', value: 5 },
        { label: 'Jun', value: 6 },
        { label: 'Jul', value: 7 },
        { label: 'Aug', value: 8 },
        { label: 'Sep', value: 9 },
        { label: 'Oct', value: 10 },
        { label: 'Nov', value: 11 },
        { label: 'Dec', value: 12 }
    ];

    let buttontitle: string = months[date.getMonth()].label + ' ' + date.getFullYear();
    console.log("buttontitle ", buttontitle);

    const onSelectMonth = (month: number | null) => {

        let y = Number(selectedYear);
        const date = new Date();
        month !== null && setSelectedMonth(month);
        console.log("month", selectedMonth); // 0 - 12
        month !== null && onMonthYearChange(month, selectedYear);
        toggleModal();
    };

    return (
        <View style={{ width: '100 %' }}>
            {/* Your calendar component */}
            <ButtonModal
                title={buttontitle}
                textStyle={{ color: "white", fontSize: 30, fontWeight: 600, alignSelf: 'center' }}
                onPress={toggleModal}
            />
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}
                animationIn="fadeInUp" animationOut="fadeOutDown">
                <ModalContainer>
                    <ModalHeader>
                    <TouchableOpacity onPress={() => onSelectYear(-1)}>
                        <Icon name="arrow-back-ios" color={'#fcf5f5'}/>
                        </TouchableOpacity>
                        <YearInput
                            keyboardType="numeric"
                            placeholder={String(date.getFullYear())}
                            placeholderTextColor={'black'}
                            maxLength={4}
                            value={selectedYear}
                            onBlur={() => onSelectYear(0)}
                            underlineColorAndroid={"rgba(0,0,0,0)"}
                            returnKeyType="done"
                            autoCorrect={false}
                            blurOnSubmit
                            selectionColor={'rgba(226, 182, 205, 0.8)'}
                            onChangeText={onChangeYear}
                        />
                        <TouchableOpacity onPress={() => onSelectYear(1)}>
                        <Icon name="arrow-forward-ios" color={'#fcf5f5'}/>
                        </TouchableOpacity>
                    </ModalHeader>
                    <Months>

                        {[...Array(12).keys()].map((item) => {
                            return (
                                <MonthItem
                                    key={item}
                                    title={months[item].label}
                                    style={[
                                        selectedMonth === item && { backgroundColor: "white", borderRadius: 15 }, { justifyContent: 'center', alignSelf: 'center' }
                                    ]}
                                    onPress={() => onSelectMonth(item)}
                                    textStyle={[{ color: "white", justifyContent: 'center', alignSelf: 'center' },
                                    selectedMonth === item && { color: "black" }]}
                                />


                            );
                        })}
                    </Months>
                </ModalContainer>
            </Modal>
        </View>
    );
};
export default CalendarModal;