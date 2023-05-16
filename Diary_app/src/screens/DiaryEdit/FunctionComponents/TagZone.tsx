import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { enableDeleteEx, setEnableDeleteEx } from '../DiaryDetail';
import ImageButton from '../../../components/common/ImageButton';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Xbutton = require('../../../assets/DiaryEditPage/remove.png');
const microButton = require('../../../assets/DiaryEditPage/microphone.png');

const TagContainer = styled(View)`
    flex-direction: row;
    flex-wrap: wrap;
    border-radius: 20px;
    background-color: rgb(48, 47, 43);
    opacity:0.8;
    margin: 10px;
    padding: 3px;
`;
const HeaderContainer = styled(View)`
    /* top: 3px; */
    padding-top: 5px;
    padding-left: 5px;
    width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    /* border-width: 1px;
    border-color: white; */
    height: 40px;
`;
const HeaderText = styled(Text)`
    color : white;
    font-weight: 700;
    font-size: 19px;
    font-family: 'Comfortaa-Regular';
    padding-left: 5px;
    width: 60%;

`;
const StyledTagWord = styled(View)`
    border-width: 1px;
    border-color: gray;
    border-radius: 50px;
    padding: 5px;
    background-color: rgb(71, 71, 70);
    opacity:1;
    /* margin: 5px; */
    margin-vertical: 5px; /* 수정: margin 속성을 marginVertical과 marginHorizontal로 분리 */
    margin-horizontal: 5px;
`;
const InsideTagView = styled(View)`
    flex-direction: row;
    align-items: center;
`;
const RemoveTagImage = styled(Image)`
    width:15px;
    height:15px;
    padding-right: 5px;
`;
const TagText = styled(Text)`
    color: white;
    /* font-size: 15px; */
    font-family: 'Poppins-Regular';
`;
const RemoveButton = styled(TouchableHighlight)`
    width: 15px;
    height: 15px;
    margin-right: 5px;
`;
const TransitionContainer = styled(View)`
    width: 25%;
    /* border-color: white;
    border-width: 1px; */
    flex-direction: row;
    
`;
const ButtontoView = styled(TouchableOpacity)`
    justify-content: center;
    /* width:10%; */
    /* border-radius: 10px; */
    padding: 5px;
    margin-right:20%;
    /* background-color: rgb(71, 71, 70); */
    align-items: center;
`;
const ViewText = styled(Text)`
    font-family: 'Comfortaa-Regular';
    /* text-align: center; */
    color: white;
    font-size: 17px;  
`;
const MicButton = styled(TouchableOpacity)`
    align-items: center;
    justify-content: center;
`;

const IconBtn = styled(Icon)`
    background-color: transparent;
    align-items: center;
`;

type ItemData = {
    id: string;
    date: string;
    tags: string[];
    isPhoto: boolean;
    isQuote: boolean;
    isDiary: boolean;
};
const DATA: ItemData[] = [
    {
        id: "0", date: "4/21/2023", tags: ["Determine", "ItIsPossible", "HardTimes", "NeverGiveUp", "ListenToMyVoice"],
        isPhoto: false, isQuote: false, isDiary: false
    },
    {
        id: "1", date: "4/15/2023", tags: ["Homework", "TryHard", "ILoveThis", "Longterm"],
        isPhoto: true, isQuote: true, isDiary: false
    },
    {
        id: "2", date: "4/11/2023", tags: ["Pizza", "Lunch", "GirlFriend", "Expo"],
        isPhoto: true, isQuote: true, isDiary: true
    },
    {
        id: "3", date: "4/10/2023", tags: ["NeverGiveUp", "Dinner", "BeBrave", "Samsung"],
        isPhoto: false, isQuote: true, isDiary: true
    },
    {
        id: "-1", date: "F", tags: [], isPhoto: false, isQuote: false, isDiary: false
    }
];
export let updateTagContentEx: any;
//get stirng[] content data from DiaryDetail.
function TagZone(props: any): JSX.Element {
    let key = props.index
    if (key === undefined) {
        key = 4
    }
    const [content, setContent] = useState<string[]>(props.content)
    const navigation = useNavigation();

    useEffect(() => {
        setContent(DATA[parseInt(key)].tags)
    }, [key])
    //things to be exported
    const [tagZoneContent, setTagZoneContent] = useState<JSX.Element[]>(
        content.map((title: string, index: number) => (
            <View style={{ position: 'relative' }} key={"View" + index}>
                <StyledTagWord key={"View2" + index}>
                    <InsideTagView key={"View3" + index}>
                        <RemoveButton key={"remove" + index}
                            onPress={() => {
                                deleteTag(index)
                            }}
                            activeOpacity={0.8}
                            underlayColor='transparent'
                        >
                            <RemoveTagImage key={"img" + index} source={Xbutton} />
                        </RemoveButton>
                        <TagText key={index + title}>
                            {title}
                        </TagText>
                    </InsideTagView>
                </StyledTagWord>

            </View>
        )
        )
    )

    const deleteTag = (index: number) => {
        // if (enableDelete)
        delete content[index]
        setContent(content)
        // setCount(count - 1)
        // decreaseCount()
        updateTagContent()
    }


    const updateTagContent = () => {
        setTagZoneContent(tagZoneContent)
        let contentHolder: JSX.Element[] = (
            content.map((title: string, index: number) => (
                <View style={{ position: 'relative' }} key={"View" + index}>
                    <StyledTagWord key={"View2" + index}>
                        <InsideTagView key={"View3" + index}>
                            <RemoveButton key={"remove" + index}
                                onPress={() => {
                                    deleteTag(index)
                                }}
                                activeOpacity={0.8}
                                underlayColor='transparent'
                            >
                                <RemoveTagImage key={"img" + index} source={Xbutton} />
                            </RemoveButton>
                            <TagText key={index + title}>
                                {title}
                            </TagText>
                        </InsideTagView>
                    </StyledTagWord>
                    {/* {
                        <TouchableHighlight
                            onPress={() => {
                                deleteTag(index)
                            }}
                            style={{
                                borderRadius: 50,
                                borderColor: 'white',
                                backgroundColor: 'black',
                                width: 25,
                                height: 25,
                            }}>
                            <Text style={{
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                X
                            </Text>
                        </TouchableHighlight>
                    }
                    <StyledTagWord onLongPress={() => { setEnableDelete(true); }} >
                        <Text style={{
                            color: 'white'
                        }} key={index + title}>{title}</Text>
                    </StyledTagWord> */}

                </View>
            )
            )
        )
        setTagZoneContent(contentHolder)
    }
    updateTagContentEx = updateTagContent


    return (
        <TagContainer>
            <HeaderContainer>
                <HeaderText>Yes, It's your day : ) </HeaderText>
                <TransitionContainer>
                <ButtontoView onPress={() => { navigation.navigate('Diary', { index: key })}}
                activeOpacity={0.8}>
                    <Icon name="eye" size={25} color="white"/></ButtontoView>
                <MicButton onPress={() => {
                        navigation.navigate('TagRecording', { index: key })
                    }} >
                    <IconBtn name="microphone" size={25} color="white" />
                    {/* <ImageButton src={microButton} onPress={() => {
                        navigation.navigate('TagRecording', { index: key })
                    }}
                        style={{ justifyContent: 'center' }}
                    /> */}
                </MicButton>
                </TransitionContainer>
            </HeaderContainer>
            {tagZoneContent}
        </TagContainer>

    );
};
export default TagZone;


// const renderItem = ({ item, index }: { item: string, index: number }) => {
//     return <Item key={index} title={item} index={index} />;
// };
// const [content, setContent] = useState<string[]>(props.content)
// const count = countEx
// const setCount = setCountEx
// const enableDelete = enableDeleteEx
// const setEnableDelete = setEnableDeleteEx

// //things to be exported
// const [tagZoneContent, setTagZoneContent] = useState<JSX.Element>(<FlatList
//     data={content}
//     renderItem={renderItem}
//     horizontal
//     showsHorizontalScrollIndicator={false}
// />)


// const deleteTag = (index: number) => {
//     // if (enableDelete)
//     delete content[index]
//     setContent(content)
//     setCount(count - 1)
//     // decreaseCount()
//     updateTagContent()

// }
// const Item = ({ title, index }: ItemProps & { index: number }) => {
//     if (title == undefined) {
//         return (
//             <></>
//         )
//     }
//     return (
//         <View style={{ position: 'relative' }}>
//             <StyledTagWord onLongPress={() => { setEnableDelete(true); }} >
//                 <Text style={{
//                     color: 'white'
//                 }} key={index + title}>{title}</Text>
//             </StyledTagWord>
//             <View style={{ position: 'absolute', right: 0 }}>
//                 {
//                     enableDelete &&
//                     <TouchableHighlight
//                         onPress={() => {
//                             deleteTag(index)
//                         }}
//                         style={{
//                             borderRadius: 50,
//                             borderColor: 'white',
//                             backgroundColor: 'black',
//                             width: 25,
//                             height: 25,
//                         }}>
//                         <Text style={{
//                             color: 'white',
//                             textAlign: 'center'
//                         }}>
//                             X
//                         </Text>
//                     </TouchableHighlight>
//                 }
//             </View>
//         </View>
//     );
// };

// const updateTagContent = () => {
//     setTagZoneContent(tagZoneContent)
//     let contentHolder = (
//         <FlatList
//         data={content}
//         renderItem={renderItem}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//     />)
//     setTagZoneContent(contentHolder)
// }
// updateTagContentEx = updateTagContent

