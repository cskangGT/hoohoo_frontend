import React, { useRef, useState } from 'react'
import { NativeSyntheticEvent, TextInput, TextInputSubmitEditingEventData, TouchableWithoutFeedback } from "react-native";
import { InputText, InputTextContainer } from '../styles';
import { HelperText } from 'react-native-paper';
//this component could be reusable if further modified. ex) modify fontSize, autoFocus etc..
//could be usuable in search bar, quote typing, etc..

//contains user type input. 
//props contains..
//checkRegulation: if pass regulation, add current text to recorded tags.

function UserTextInput(props: any): JSX.Element {
    const [text, setText] = useState<string>("")

    //focus if current mode is type mode which contains Speech Mode button

    const textInputRef = useRef<TextInput>(null);
    const handleOutsideTouch = () => {
        if (textInputRef.current) {
            textInputRef.current.blur();
        }
    };
    const hasLengthError = () => {
        return ((text !== undefined && text.length >= props.limit))
    };
    const hasCapacityError = () => {
        return (text !== undefined && props.currentCapability - text.length < 0)
    }
    return (
        <TouchableWithoutFeedback onPress={handleOutsideTouch}>
            <InputTextContainer>
                <InputText
                    ref={textInputRef}
                    value={text}
                    onChangeText={(t: string) => {
                        setText(t);
                    }}
                    blurOnSubmit={false}
                    onSubmitEditing={(event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
                        props.checkRegulation(event.nativeEvent.text)
                        props.setPlaceholder(event.nativeEvent.text);
                        setText("");
                    }}
                    autoCapitalize='sentences'
                    autoCorrect={false}
                    placeholder={props.placeholder}
                    placeholderTextColor="#CCCCCC"
                    onFocus={() => {
                        props.setIsTyping(true);
                    }}
                    onBlur={() => {
                        props.setIsTyping(false);
                    }}
                />
                {
                    hasLengthError() &&
                    <HelperText
                        style={{
                            color: 'white',
                            opacity: 0.6,
                            paddingLeft: '10%',
                            width: '100%',
                            alignSelf: 'center'
                        }}
                        type="error"
                        visible={hasLengthError()}
                    >
                        {'Max limit exceeded:\nLength of a tag should be less than ' + props.limit}
                    </HelperText>
                }
                {
                    (hasCapacityError()) &&
                    <HelperText
                        style={{
                            color: 'white',
                            opacity: 0.6,
                            paddingLeft: '10%',
                            width: '100%',
                            alignSelf: 'center'
                        }}
                        type="error"
                        visible={hasCapacityError()}
                    >
                        {'Max capacity exceeded:\nYou have recorded more than ' + props.capacity + ' letters'}
                    </HelperText>
                }
            </InputTextContainer>
        </TouchableWithoutFeedback>
    );
}
export default UserTextInput