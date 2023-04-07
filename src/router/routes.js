import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import Splash from "../screens/Splash";

const AppContainer = () => {

    const RootStack = createNativeStackNavigator();
    

    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#0080ff'
                    },
                    headerTintColor: '#ffffff',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontWeight: 'bold'
                    }
                }}
            >
                <RootStack.Screen
                    name="Splash"
                    component={Splash}
                    options={{
                        headerShown: false,
                    }}
                />
                <RootStack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;