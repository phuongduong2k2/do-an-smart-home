/* eslint-disable react-native/no-inline-styles */
import {Image} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  source: string;
};

const ImageAnim = (props: Props) => {
  const {source} = props;

  const animValue = useSharedValue(0);

  const animStyle = useAnimatedStyle(() => {
    return {
      opacity: animValue.value,
      transform: [
        {
          translateX: interpolate(animValue.value, [0, 1], [20, 0]),
        },
        {
          translateY: interpolate(animValue.value, [0, 1], [-20, 0]),
        },
      ],
    };
  });

  const onDone = () => {
    animValue.value = withTiming(1, {duration: 1000});
  };

  return (
    <Animated.View
      style={[
        {
          //   borderWidth: 1,
          width: '70%',
          height: '90%',
          top: 10,
          position: 'absolute',
          right: 0,
          zIndex: 0,
          borderColor: 'red',
          padding: 10,
        },
        animStyle,
      ]}>
      <Image
        onLoadEnd={onDone}
        source={{uri: source}}
        style={{
          resizeMode: 'cover',
          height: '100%',
          width: '100%',
        }}
      />
    </Animated.View>
  );
};

export default ImageAnim;
