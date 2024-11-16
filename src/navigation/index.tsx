import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTab from './BottomTab';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppDispatch} from '../hooks';
import {setSafeAreaInsets} from '../redux/slice';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (insets) {
      dispatch(setSafeAreaInsets(insets));
    }
  }, [insets, dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="BottomTab" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
