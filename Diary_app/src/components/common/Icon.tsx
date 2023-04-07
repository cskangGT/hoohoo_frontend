import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';


interface Props {
    onPress?: () => void;
    source: any;
    style?: {};
}

const MyIcon = (props: Props) => {
    const { onPress, source, style } = props;
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Image source={source} />
        </TouchableOpacity>
    )
};

export default MyIcon;
