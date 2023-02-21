import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from '../../screens/IntroScreen/IntroScreen';
import TagRecording from '../../screens/TagRecording/TagRecording';


const RootStack = createNativeStackNavigator();
// 각 화면 전환 될 수 있는 기본 틀 제공


const Navigator = () => {
    return (
        // 네비 트리 관리 컴포넌트 
        <NavigationContainer>
            {/* 네비게이션 기본 스택 생성 */}
            <RootStack.Navigator initialRouteName="IntroScreen">
                {/* 스택에 들어갈 화면 컴포넌트들  */}
                <RootStack.Screen
                    name="IntroScreen"
                    component={IntroScreen}
                    // options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="TagRecording"
                    component={TagRecording}
                    // options={{ headerShown: false }}
                />
                {/* <RootStack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Main"
                    component={Main}
                    options={{ headerShown: false }}
                />
                <RootStack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ title: '회원가입', headerTitleAlign: 'center' }}
                /> */}
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;