import React, { useEffect, useRef } from 'react'
import { ScrollView } from "react-native";
import { TagContainers } from '../styles';
//tag for user input or recorded ones
function WordContainer(content: any & JSX.Element): JSX.Element {
    const scrollViewRef = useRef<ScrollView>(null);
    const scrollToTop = () => {
        scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    };
    //scroll to the top automatically. 
    //should be mandatory?..
    useEffect(() => {
        scrollToTop()
    },
        [content.content])
    return (
        // <StyledButtonContainer>
        <TagContainers>
            {
                content.content
            }
        </TagContainers>
    )
}
export default WordContainer;
