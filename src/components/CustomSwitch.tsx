/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  value?: boolean;
  onPress?: () => void;
  width?: number;
  containerStyles?: ViewStyle;
  toggleStyle?: ViewStyle;
  inactiveBgColor?: string;
  inactiveToggleColor?: string;
  activeBgColor?: string;
  activeToggleColor?: string;
}

const CustomSwitch = (props: Props) => {
  const {
    value = false,
    onPress = () => {},
    width = 44,
    containerStyles = {},
    toggleStyle = {},
    activeBgColor = 'green',
    activeToggleColor = 'white',
    inactiveBgColor = '#00000040',
    inactiveToggleColor = 'white',
  } = props;
  const animValue = useSharedValue(value ? 0 : width / 2);

  const toggleSwitch = useCallback(() => {
    animValue.value = withTiming(value ? width / 2 : 0);
  }, [animValue, value, width]);

  useEffect(() => {
    toggleSwitch();
  }, [value, toggleSwitch]);

  const toggleAnimStyle = useAnimatedStyle(() => {
    return {
      width: animValue.value,
    };
  });

  const animColor = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animValue.value,
        [0, width / 2],
        [inactiveBgColor, activeBgColor],
      ),
    };
  });

  const animColorToggle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animValue.value,
        [0, width / 2],
        [inactiveToggleColor, activeToggleColor],
      ),
    };
  });

  const TouchableOpacityAnim =
    Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <TouchableOpacityAnim
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        animColor,
        containerStyles,
        {width, padding: width / 22, justifyContent: 'center'},
      ]}>
      <View
        style={{
          zIndex: 1,
          width: '100%',
          flexDirection: 'row',
        }}>
        <Animated.View style={toggleAnimStyle} />
        <Animated.View
          style={[
            styles.toggle,
            {height: (9 * width) / 22, ...toggleStyle},
            animColorToggle,
          ]}
        />
      </View>
      <View
        style={{
          zIndex: 0,
          flexDirection: 'row',
          height: '100%',
          width: '100%',
          position: 'absolute',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: '100%',
            width: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>ON</Text>
        </View>
        <View
          style={{
            width: '50%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={styles.text}>OFF</Text>
        </View>
      </View>
    </TouchableOpacityAnim>
  );
};

const styles = StyleSheet.create({
  container: {
    height: undefined,
    aspectRatio: 2,
    borderRadius: 1000,
    flexDirection: 'row',
  },
  toggle: {
    width: undefined,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 10000,
    shadowColor: 'black',
    shadowOffset: {
      height: 1,
      width: 0,
    },
    elevation: 10,
    shadowOpacity: 0.5,
  },
  text: {color: 'white', fontWeight: '700'},
});

export default memo(CustomSwitch);
