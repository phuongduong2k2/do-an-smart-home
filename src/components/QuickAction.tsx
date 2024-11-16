/* eslint-disable react-native/no-inline-styles */
import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import ImageAnim from './ImageAnim';
import GestureSwipe from './GestureSwipe';
import CustomSwitch from './CustomSwitch';

export type TAction = 'swipe' | 'switch';

type Props = {
  name?: string;
  value?: boolean | number;

  imgSrc?: string;
  connected?: boolean;
  type?: TAction;
  onToggle?: () => void;
  datasensor?: boolean;
  style?: StyleProp<ViewStyle>;
};

const QuickAction = (props: Props) => {
  const {
    name = '',
    value = false,
    onToggle = () => {},
    imgSrc = '',
    connected,
    type = 1,

    datasensor,
    style,
  } = props;
  return (
    <View style={[styles.container, style]}>
      <View
        style={{
          width: '40%',
          height: 100,
        }}>
        <Text
          style={{color: 'white', fontSize: 20, zIndex: 1}}
          numberOfLines={3}>
          {name}
        </Text>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', zIndex: 1000}}>
        <Text style={{color: 'white', fontSize: 12}}>Connected</Text>
        <View
          style={[
            styles.status,
            {backgroundColor: connected ? '#00ff08' : '#ff0000'},
          ]}
        />
      </View>
      <View style={{flex: 1}} />
      {imgSrc && <ImageAnim source={imgSrc} />}
      {!datasensor && typeof value === 'boolean' && (
        <>
          {type === 'swipe' ? (
            <GestureSwipe value={value} onSwipeDone={onToggle} />
          ) : (
            <View style={{width: '100%', alignItems: 'center'}}>
              <CustomSwitch
                width={80}
                value={value}
                activeBgColor="#008C28"
                inactiveBgColor="grey"
                onPress={onToggle}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: undefined,
    aspectRatio: 3 / 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 20,
    backgroundColor: 'rgba(0,21,36,0.5)',
    padding: 10,
  },
  status: {
    height: 10,
    width: 10,
    marginLeft: 10,
    borderRadius: 100,
  },
});

export default memo(QuickAction);
