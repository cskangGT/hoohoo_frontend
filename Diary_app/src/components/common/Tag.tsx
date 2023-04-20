import styled from 'styled-components';
import React from 'react'
import { View, Text, Image, TouchableHighlight } from 'react-native'
const Xbutton = require('../../../assets/DiaryEditPage/remove.png');
const microButton = require('../../../assets/DiaryEditPage/microphone.png');
interface Props {
    title: string;
    delete: (index: number, words: string[], setWords: React.Dispatch<React.SetStateAction<string[]>>, setWordContent: React.Dispatch<React.SetStateAction<JSX.Element[] | undefined>>, curr_size?: number) => void;
    index: number;
}

const TagContainer = styled(View)`
    
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
const Tag = (props: Props) => {

    const { title, delete, index, } = props;



    return (
        <StyledTagWord >
            <InsideTagView>
                <RemoveButton
                    onPress={() => {
                        delete (index)
                    }}
                >
                    <RemoveTagImage source={Xbutton} />
                </RemoveButton>
                <TagText key={index + title}>
                    {title}
                </TagText>
            </InsideTagView>
        </StyledTagWord>
    )
}
export default Tag;