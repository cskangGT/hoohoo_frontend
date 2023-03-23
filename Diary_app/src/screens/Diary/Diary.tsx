import { View, Text, Dimensions, TouchableOpacity, FlatList, LayoutChangeEvent } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

import { SafeAreaView,ScrollView } from 'react-native';
import LimitedText from './Tags/LimitedText';
import MovingRect from './Tags/MovingRect';


type DataItem = {
    id: string;
    title: string;
};
const DATA: DataItem[] = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Georgia Tech',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Monsun',
    },
    {
        id: 'sdffsd23r-3da1-471f-bd96-145571e29d72',
        title: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    },
    {
        id: '623463tfdfs-3da1-471f-bd96-145571e29d72',
        title: 'Shin Ramen',
    },
    {
        id: '4twasdv-3da1-471f-bd96-145571e29d72',
        title: 'The United States of America',
    },
    {
        id: '34gre-3da1-471f-bd96-145571e29d72',
        title: 'Gasi',
    },
    {
        id: '31515-3da1-471f-bd96-145571e29d72',
        title: 'Samsung',
    },
    {
        id: '1411-3da1-471f-bd96-145571e29d72',
        title: 'Korea',
    },
    {
        id: '141511-3da1-471f-bd96-145571e29d72',
        title: 'Japan',
    },
    {
        id: '1411-fsffds-471f-bd96-145571e29d72',
        title: 'OSCAR',
    },
    {
        id: 'SFSFS-3da1-471f-bd96-145571e29d72',
        title: 'Atlanta is the capital',
    },
    {
        id: '1411-3da1-471f-bd96-145571e29d72',
        title: 'Georgia State',
    },
    {
        id: '141511-3da1-471f-bd96-145571e29d72',
        title: 'Japan',
    },
];

function RectContentContainer(content: JSX.Element[] & any): JSX.Element {

    return (
        <View>
            {content.content}
        </View>
    )
}

function Diary(): JSX.Element {
    // const renderItem = ({ item, index }: { item: DataItem, index: number }) => {

    //     return <MovingRect title={item.title} index={index} />
    // };
    const [rect, setRect] = useState<JSX.Element[]>([<MovingRect title={DATA[0].title} index={0} />]);
    const [index, setIndex] = useState<number>(1);

    useEffect(() => {
        if (index < DATA.length) {
            rect.push(<MovingRect title={DATA[index].title} index={index} key = {DATA[index].title+index} />);

            setRect(rect)
            // console.log("index", index)
        }
        setTimeout(() => {
            setIndex(index + 1);
        }, 3000);
    }, [index]);

    const [tagContentHeight, setTagContentHeight] = useState<number>(0)
    const windowHeight = Dimensions.get('window').height
    const getHeight = (event: LayoutChangeEvent) => {
        const tagHeight = event.nativeEvent.layout.height
        setTagContentHeight(tagHeight)
    }
    return (
        <SafeAreaView >
            <ScrollView>
                <RectContentContainer
                    onLayout={getHeight}
                    content={rect as JSX.Element[]} />
                <View
                    style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: windowHeight - tagContentHeight,
                        borderColor: 'black',
                        borderWidth: 1,

                    }}>


                </View>
            </ScrollView>
        </SafeAreaView >
    );
};
export default Diary;


