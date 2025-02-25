import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import React, {memo} from 'react';
import AnimatedNumbers from 'react-native-animated-numbers';
import * as Progress from 'react-native-progress';

type Props = {
  style?: StyleProp<ViewStyle>;
  color?: string;
  name: string;
  image: string;
  value: number;
  haveProgress?: boolean;
  progress?: number;
};

const AnalyticSummary = (props: Props) => {
  const {style, name, image, value, haveProgress, color, progress = 0} = props;

  return (
    <View style={[styles.container, style]}>
      <Text style={{color: 'black', fontSize: 20}}>{name}</Text>
      <Image
        style={{resizeMode: 'contain', width: 80, height: 80}}
        source={{
          uri: image,
        }}
      />

      <AnimatedNumbers
        includeComma
        animateToNumber={value}
        animationDuration={300}
        fontStyle={{fontSize: 30, fontWeight: 'bold'}}
      />

      {haveProgress && (
        <Progress.Circle
          size={70}
          progress={progress}
          showsText
          color={color}
          textStyle={{fontSize: 20, fontWeight: '600'}}
        />
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
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,21,36,0.3)',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
  },
});

export default memo(AnalyticSummary);
