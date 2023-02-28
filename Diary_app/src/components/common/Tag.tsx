import styled from 'styled-components';
import React from 'react'
import { View, Text } from 'react-native'

const TagContainer = styled(View)`
    text-align: center;
    padding-left: 5px;
    padding-right: 5px;
    /* padding : 10px; */
    border-radius: 5px;
    border: 1px;
`;

const TagText = styled(Text)`
    font-size: 15px;
`;


const Tag = ({text} : {text : string}) => {
    return (
        <TagContainer>
            <TagText>{text}</TagText>
        </TagContainer>    
    )
}
export default Tag;