import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import Background from '../assets/icons/background.svg';
import {BlurView} from '@react-native-community/blur';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const AppContainer = (props: Props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.background}>
        <View style={{flex: 1}} />
        <Background width={'100%'} />
      </View>

      <BlurView
        style={styles.absolute}
        overlayColor="transparent"
        blurType="light"
        blurAmount={3}>
        <View style={[{flex: 1}, props.style]}>{props.children}</View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  background: {
    backgroundColor: '#03001C',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});

export default AppContainer;
