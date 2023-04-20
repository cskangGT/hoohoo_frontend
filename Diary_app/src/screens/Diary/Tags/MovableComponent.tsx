// import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { Button } from 'react-native/Libraries/Components/Button';
// import { TouchableHighlight } from 'react-native-gesture-handler';
// function MovableCompontent(): JSX.Element {
//     //this is useless. I might delete the file.
//     const [position, setPosition] = useState(0);
//     useEffect(() => {
//         console.log(position)
//         const id = setInterval(() => {
//             setPosition((prevPosition) => prevPosition + 10);
//         }, 1000);
//         setTimeout(() => {
//             clearInterval(id);
//         }, 10000); // update position every 16.6ms (60 fps)
       

//     }, []);
    

//     return (
//         <View>
//             <View>
//                 <View style={{
//                     borderWidth: 1,
//                     borderColor: 'black',
//                     borderRadius: 10,
//                     position: 'absolute', top: position
//                 }}>
//                     <Text>
//                         hahaha
//                     </Text>
//                 </View>
//             </View >
//         </View >
//     )


// }
// export default MovableCompontent;

