import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Substract from '../assets/icons/Subtract.svg';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {listTab} from './BottomTab';

type Props = BottomTabBarProps;

const CustomTabBar = (tabProps: Props) => {
  const {navigation, state, insets} = tabProps;

  const handleNavigation = (name: string) => {
    navigation.navigate(name);
  };

  return (
    <View style={{position: 'absolute', bottom: 0}}>
      <View style={styles.tabBarContainer}>
        <View style={styles.substract}>
          <Substract width={'100%'} />
        </View>
        <View style={styles.tabContainer}>
          {state.routes.map((route, index) => {
            const Icon = listTab[index].icon;
            if (index === 2) {
              return (
                <TouchableOpacity
                  key={route.key}
                  style={styles.touch}
                  onPress={() => handleNavigation(route.name)}>
                  <View style={styles.center}>
                    <Icon height={50} width={50} color="white" />
                  </View>
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={route.key}
                style={styles.tab}
                onPress={() => handleNavigation(route.name)}>
                <Icon />
                <Text style={styles.label}>{route.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View
        style={{
          height: insets.bottom / 2,
          width: '100%',
          backgroundColor: '#001524',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  substract: {width: '100%', position: 'absolute'},
  tabBarContainer: {height: 84, bottom: 0},
  tab: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touch: {width: '20%', height: '100%'},
  center: {
    borderWidth: 3,
    height: 80,
    position: 'absolute',
    width: 80,
    borderColor: 'rgba(100,100,100,0.5)',
    top: -37,
    alignSelf: 'center',
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100,100,100,0.2)',
  },
  label: {textAlign: 'center', color: 'white'},
});

export default CustomTabBar;
