import styled from 'styled-components';
import React from 'react'
import { View, Text } from 'react-native'

const TagContainer = styled(View)`
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    /* padding : 10px; */
    margin-top: 5px;
    border-radius: 5px;
    border: 1px;
    margin-right: 5px;
`;

const TagText = styled(Text)`
    font-size: 15px;
`;

interface Props {
    text: string;
    textStyle?: {};
    style?: {};
}

const Tag = (props: Props) => {
    // console.log('text', text)
    const { text, textStyle, style } = props;
    return (
        <TagContainer style={style}>
            <TagText style={textStyle}>{text}</TagText>
        </TagContainer>
    )
}
export default Tag;