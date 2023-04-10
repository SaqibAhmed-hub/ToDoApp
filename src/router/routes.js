import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DoneScreen from "../screens/DoneScreen";
import Splash from "../screens/Splash";
import TodoScreen from "../screens/TodoScreen";
import TaskScreen from "../screens/TaskScreen";

const AppContainer = () => {

    const RootStack = createNativeStackNavigator();

    const TabStack = createBottomTabNavigator();

    function Home() {
        return (
            <TabStack.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size, color }) => {
                        let iconName;
                        if (route.name === 'Todo') {
                            iconName = 'clipboard-list';
                            size = focused ? 25 : 20;
                        } else if (route.name === 'Done') {
                            iconName = 'clipboard-check';
                            size = focused ? 25 : 20;
                        }
                        return (
                            <FontAwesome5
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    }
                })}
                tabBarOptions={{
                    activeTintColor: '#0080ff',
                    inactiveTintColor: '#777777',
                    labelStyle: { fontSize: 15, fontWeight: 'bold' }
                }}
            >
                <TabStack.Screen
                    name="Todo"
                    component={TodoScreen}
                ></TabStack.Screen>
                <TabStack.Screen
                    name="Done"
                    component={DoneScreen}
                ></TabStack.Screen>
            </TabStack.Navigator>
        );
    }

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
                        fontSize: 20,
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
                    component={Home}
                    options={{
                        headerShown: false,
                    }}
                />
                <RootStack.Screen
                    name="Task"
                    component={TaskScreen}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;