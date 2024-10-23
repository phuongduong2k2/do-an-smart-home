/* eslint-disable react-native/no-inline-styles */
import {LayoutChangeEvent, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Padlock from '../assets/icons/padlock.svg';
import PadUnLock from '../assets/icons/padunlock.svg';
import Arrow from '../assets/icons/arrow.svg';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  clamp,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  value?: boolean;
  onSwipeDone?: () => void;
};

const GestureSwipe = (props: Props) => {
  const {onSwipeDone = () => {}, value = false} = props;
  const [widthLayout, setWidthLayout] = useState(0);
  const circleTranX = useSharedValue(0);
  const panTranX = useSharedValue(0);
  const animFlash = useSharedValue(0);

  const animCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: circleTranX.value},
        {scale: interpolate(animFlash.value, [0, 1], [1, 2])},
      ],
    };
  });

  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      panTranX.value = circleTranX.value;
    })
    .onUpdate(event => {
      animFlash.value = withTiming(event.translationX >= widthLayout ? 1 : 0);
      circleTranX.value = clamp(event.translationX, 0, widthLayout);
    })
    .onEnd(() => {
      circleTranX.value = withTiming(0);
      animFlash.value = withTiming(0);
    })
    .onFinalize(event => {
      if (event.translationX >= widthLayout) {
        runOnJS(onSwipeDone)();
      }
    });

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setWidthLayout(event.nativeEvent.layout.width - 44 - 6);
  }, []);

  const animValue = useSharedValue(0);

  const animArrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: animValue.value}],
      opacity: interpolate(animValue.value, [0, 6], [0.4, 1]),
    };
  });

  useEffect(() => {
    animValue.value = withRepeat(withTiming(6, {duration: 800}), 0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.btnContainer,
            animCircleStyle,
            {backgroundColor: value ? '#04ff3e82' : '#ff000082', zIndex: 1000},
          ]}>
          {!value ? <Padlock /> : <PadUnLock />}
        </Animated.View>
      </GestureDetector>
      <Animated.View style={[animArrowStyle, styles.arrowContainer]}>
        <Arrow color={'white'} style={{opacity: 0.4}} />
        <Arrow color={'white'} style={{opacity: 0.7}} />
        <Arrow color={'white'} />
      </Animated.View>
      <View
        style={[
          styles.btnContainer,
          {backgroundColor: !value ? '#04ff3e82' : '#ff000082'},
        ]}>
        {value ? <Padlock /> : <PadUnLock />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    height: 50,
    width: '100%',
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 3,
    flexDirection: 'row',
  },
  btnContainer: {
    height: 44,
    width: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 1000,
  },
  arrowContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default GestureSwipe;
