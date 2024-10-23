import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DevicesScreen from '../screens/DevicesScreen';
import ScanQrCodeScreen from '../screens/ScanQrCodeScreen';
import SettingScreen from '../screens/SettingScreen';
import AccountScreen from '../screens/AccountScreen';

import Home from '../assets/icons/home.svg';
import User from '../assets/icons/user.svg';
import QrCode from '../assets/icons/qr-code.svg';
import Settings from '../assets/icons/settings.svg';
import SmartPhone from '../assets/icons/smartphone.svg';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

export const listTab = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: Home,
  },
  {
    name: 'Devices',
    component: DevicesScreen,
    icon: SmartPhone,
  },
  {
    name: 'QrCode',
    component: ScanQrCodeScreen,
    icon: QrCode,
  },
  {
    name: 'Setting',
    component: SettingScreen,
    icon: Settings,
  },
  {
    name: 'Account',
    component: AccountScreen,
    icon: User,
  },
];

const BottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      tabBar={CustomTabBar}
      screenOptions={{headerShown: false}}>
      {listTab.map(tab => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTab;
