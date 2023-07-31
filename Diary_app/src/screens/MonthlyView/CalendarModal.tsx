import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';

import CustomButton from '../../components/common/Button';

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

const CalendarModal = ({ date, onMonthYearChange }: any) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [selectedYear, setSelectedYear] = useState(String(date.getFullYear()));

    useEffect(() => {
        setSelectedMonth(date.getMonth());
        setSelectedYear(String(date.getFullYear()));
    }, [date]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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

    let buttonTitle = months[date.getMonth()].label + ' ' + date.getFullYear();

    const onSelectMonth = (month: number | null) => {
        if (month !== null) {
            setSelectedMonth(month);
            onMonthYearChange(month, selectedYear);
        }
        toggleModal();
    };

    return (
        <View style={{ width: '100 %' }}>
            <ButtonModal
                style={{ backgroundColor: '#1a1a1a', borderRadius: 10 }}
                title={buttonTitle}
                textStyle={{ color: "#f1f1f1", fontSize: 30, fontWeight: 600, alignSelf: 'center' }}
                onPress={toggleModal}
            />
            <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}
                animationIn="fadeInUp" animationOut="fadeOutDown">
                <ModalContainer>
                    <ModalHeader>
                        <TouchableOpacity onPress={() => onSelectYear(-1)}>
                            <Icon name="arrow-back-ios" color={'#fcf5f5'} />
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
                            <Icon name="arrow-forward-ios" color={'#fcf5f5'} />
                        </TouchableOpacity>
                    </ModalHeader>
                    <Months>
                        {months.map((month, index) => (
                            <MonthItem
                                key={index}
                                title={month.label}
                                style={[
                                    selectedMonth === index && { backgroundColor: "white", borderRadius: 15 },
                                    { justifyContent: 'center', alignSelf: 'center' }
                                ]}
                                onPress={() => onSelectMonth(index)}
                                textStyle={[
                                    { color: "white", justifyContent: 'center', alignSelf: 'center' },
                                    selectedMonth === index && { color: "black" }
                                ]}
                            />
                        ))}
                    </Months>
                </ModalContainer>
            </Modal>
        </View>
    );
};

export default CalendarModal;
