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


const Tag = ({text} : {text : string}) => {
    // console.log('text', text)
    return (
        <TagContainer>
            <TagText>{text}</TagText>
        </TagContainer>    
    )
}
export default Tag;