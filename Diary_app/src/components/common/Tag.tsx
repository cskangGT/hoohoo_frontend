import styled from 'styled-components';
import React from 'react'
import { View, Text } from 'react-native'

const TagContainer = styled(View)`
    text-align: center;
    padding-left: 3px;
    padding-right: 3px;
    /* padding : 10px; */
    margin-top: 1px;
    
    margin-right: 3px;
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