import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';

import * as Progress from 'react-native-progress';

type Props = {
  style?: StyleProp<ViewStyle>;
  color?: string;
  name: string;
  start: boolean;
  image: string;
};

const AnalyticSummary = (props: Props) => {
  const {style, color, name, start, image} = props;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (start) {
      interval = setInterval(() => {
        if (progress === 1) {
          setProgress(0);
        } else {
          setProgress(prev => prev + 0.2);
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
    };
  }, [progress, start]);

  return (
    <View style={[styles.container, style]}>
      <Text style={{color: 'black', fontSize: 20}}>{name}</Text>
      <Image
        style={{resizeMode: 'contain', width: 80, height: 80}}
        source={{
          uri: image,
        }}
      />
      <Progress.Circle size={100} progress={progress} showsText color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '48%',
    height: undefined,
    aspectRatio: 3 / 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,21,36,0.3)',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
  },
});

export default memo(AnalyticSummary);
