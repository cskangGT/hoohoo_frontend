import { View, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import styled from 'styled-components';
import ImageButton from '../../../components/common/ImageButton';
import { useNavigation } from '@react-navigation/native';


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
    margin: 5px;
`;
const InsideTagView = styled(View)`
    flex-direction: row;
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
const ButtontoView = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: gray;
    width:20%;
    border-radius: 50px;
    padding: 5px;
    
    background-color: rgb(71, 71, 70);
    align-items: center;
`;
const ViewText = styled(Text)`
    font-family: 'Comfortaa-Regular';
    /* text-align: center; */
    color: white;
    font-size: 17px;  
`;
export let updateTagContentEx: any;
//get stirng[] content data from DiaryDetail.
function TagZone(props: any): JSX.Element {
    const key = props.index
    const [content, setContent] = useState<string[]>(props.content)
    const navigation = useNavigation();


    //things to be exported
    const [tagZoneContent, setTagZoneContent] = useState<JSX.Element[]>(
        content.map((title: string, index: number) => (
            <View style={{ position: 'relative' }}>
                <StyledTagWord >
                    <InsideTagView>
                        <RemoveButton
                            onPress={() => {
                                deleteTag(index)
                            }}>
                            <RemoveTagImage source={Xbutton} />
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
                <View style={{}}>
                    <StyledTagWord >
                        <InsideTagView>
                            <RemoveButton
                                onPress={() => {
                                    deleteTag(index)
                                }}
                            >
                                <RemoveTagImage source={Xbutton} />
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
                <ButtontoView onPress={() => { navigation.navigate('Diary', { index: key }) }}>
                    <ViewText >
                        View
                    </ViewText></ButtontoView>
                <View style={{ width: '20%', alignItems: 'center' }}>
                    <ImageButton src={microButton} onPress={() => {
                        navigation.navigate('TagRecording', { index: key })
                    }}
                        style={{ justifyContent: 'center' }}
                    />
                </View>
            </HeaderContainer>
            {tagZoneContent}
        </TagContainer>

    );
};
export default TagZone;