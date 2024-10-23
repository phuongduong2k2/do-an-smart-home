/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React, {memo} from 'react';
import ImageAnim from './ImageAnim';
import GestureSwipe from './GestureSwipe';

type Props = {
  name?: string;
  value?: boolean;
  onSwipeDone?: () => void;
  imgSrc?: string;
};

const QuickAction = (props: Props) => {
  const {name = '', value = false, onSwipeDone = () => {}, imgSrc = ''} = props;
  return (
    <View
      style={{
        width: '48%',
        height: undefined,
        aspectRatio: 3 / 4,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
        borderRadius: 20,
        backgroundColor: 'rgba(0,21,36,0.5)',
        padding: 10,
      }}>
      <Text
        style={{color: 'white', fontSize: 20, width: '35%', zIndex: 1}}
        numberOfLines={3}>
        {name}
      </Text>
      <View style={{flex: 1}} />
      <ImageAnim source={imgSrc} />
      <GestureSwipe value={value} onSwipeDone={onSwipeDone} />
    </View>
  );
};

export default memo(QuickAction);
