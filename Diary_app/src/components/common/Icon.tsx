import React from 'react';
import { TouchableOpacity, Image } from 'react-native';


interface Props {
    onPress?: () => void;
    source: any;
    style?: {};
    imageStyle?: {};
}
const MyIcon = (props: Props) => {
    const { onPress, source, style, imageStyle } = props;
    return (
        <TouchableOpacity onPress={onPress} style={style}>
            <Image source={source} style={imageStyle} />
        </TouchableOpacity>
    )
};
export default MyIcon;
