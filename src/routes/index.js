import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import HomeNavigation from './home';

const RootStack = createNativeStackNavigator();

const Router = () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name={'Home'}
        component={HomeNavigation}
        options={{
          headerShown: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default observer(Router);
