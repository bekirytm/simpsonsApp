import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from '../screens/List';
import DetailScreen from '../screens/List/Detail';
import AddScreen from '../screens/Add';
const HomeStack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{animationEnabled: false}}
      options={{headerShown: false}}>
      <HomeStack.Screen
        name="List"
        component={ListScreen}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />

      <HomeStack.Screen
        name="Add"
        component={AddScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
};
export default HomeNavigation;
