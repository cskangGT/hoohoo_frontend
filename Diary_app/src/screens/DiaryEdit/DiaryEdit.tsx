import { View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import LimitedText from '../Diary/Tags/LimitedText';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { CameraOptions } from 'react-native-image-picker/lib/typescript/types'
import { TouchableHighlight, Image, TextInput, PermissionsAndroid } from 'react-native';
import UserTextInput from '../TagRecording/Containers/UserTextInput';
import PhotoUpload from './CameraRelated/PhotoUpload';
import styled from 'styled-components';
const StyledTagWord = styled(TouchableOpacity)`
    border-width: 1px,
    border-color: orange,
    border-radius: 50px,
    padding: 10px,
    background-color: transparent,
    margin: 5px
`;
type DataItem = {
    id: string;
    title: string;
};
const DATA: DataItem[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'abcdefghijklmn',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: 'sdffsd23r-3da1-471f-bd96-145571e29d72',
        title: 'Long tag Long tag  Long tag  Long tag  Long tag Long tag Long tagItem',
    },
    {
        id: '623463tfdfs-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '4twasdv-3da1-471f-bd96-145571e29d72',
        title: 'Fourth Item~!@#$!',
    },
    {
        id: '34gre-3da1-471f-bd96-145571e29d72',
        title: 'TOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOLONG',
    },
];

type ItemProps = { title: string, index: number };

const Item = ({ title, index }: ItemProps & { index: number }) => {
    return (
            
            <StyledTagWord key={title} >
                <Text key={index + title}>{title}</Text>
            </StyledTagWord>
    );
};
const renderItem = ({ item, index }: { item: DataItem, index: number }) => {
    return <Item key={item.id} title={item.title} index={index} />;
};


function DiaryEdit(): JSX.Element {

    //turn on the textinput
    const [writeDiary, setWriteDiary] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    return (
        <SafeAreaView >
            <ScrollView>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
                <PhotoUpload />
                <View>
                    {writeDiary ?
                        <View>
                            <TextInput
                                placeholder='Tell me your story'
                                value={writeDiary}
                                multiline={true}
                                onChangeText={(text) => { setText(text) }}
                            />
                            <TouchableOpacity onPress={() => { console.log("save the file") }}
                                style={{
                                    borderColor: '#8FDF70',
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    backgroundColor: '#8FDF70'
                                }}>

                                <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>
                                    SAVE
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setWriteDiary(false) }}
                                style={{
                                    borderColor: 'red',
                                    borderWidth: 1,
                                    borderRadius: 50,
                                    backgroundColor: 'red'
                                }}>

                                <Text style={{ fontSize: 25, textAlign: 'center' }}>
                                    X
                                </Text>
                            </TouchableOpacity>
                        </View>
                        :
                        <TouchableOpacity onPress={() => { setWriteDiary(true) }}>
                            <Text style={{ fontSize: 25, borderWidth: 1, textAlign: 'center' }}>
                                WRITE YOUR DAY
                            </Text>
                        </TouchableOpacity>
                    }

                </View>
            </ScrollView>
        </SafeAreaView>

    );
};
export default DiaryEdit;


