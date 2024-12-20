/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {memo, useCallback, useState} from 'react';
import ImageAnim from './ImageAnim';
import GestureSwipe from './GestureSwipe';
import CustomSwitch from './CustomSwitch';
import {TListControl} from './Controller';
import Alarm from '../assets/icons/alarm.svg';
import ModalDate, {TDateModal} from './ModalDate';

export type TAction = 'swipe' | 'switch';

type Props = {
  value?: boolean;
  isLoading?: boolean;
  connected?: boolean;
  type?: TAction;
  onToggle?: (item: TListControl, index: number, status: boolean) => void;
  datasensor?: boolean;
  data?: TListControl;
  style?: StyleProp<ViewStyle>;
  index?: number;
  onSelectDate?: (date: Date, value: boolean, index: number) => void;
  dateData?: TDateModal;
};

const QuickAction = (props: Props) => {
  const {
    value = false,
    onToggle = () => {},
    connected,
    type = 1,
    isLoading,
    datasensor,
    style,
    data,
    index,
    onSelectDate = () => {},
    dateData,
  } = props;

  const [visible, setVisible] = useState(false);

  const onAction = useCallback(() => {
    if (data && typeof index === 'number') {
      if (!connected) {
        Alert.alert('Control Failed', 'Please connect to your server');
        return;
      }
      onToggle(data, index, value);
    }
  }, [onToggle, data, index, connected, value]);

  return (
    <View style={[styles.container, style]}>
      <ModalDate
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}
        data={dateData}
        onDone={(date: Date, state: boolean) => {
          if (typeof index === 'number') {
            onSelectDate(date, state, index);
          }
        }}
        onSwipeComplete={() => {
          setVisible(false);
        }}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={'green'} size={'large'} />
        </View>
      )}
      <View style={{padding: 10, opacity: isLoading ? 0.2 : 1, height: '100%'}}>
        <View
          style={{
            width: '50%',
            height: 100,
          }}>
          <Text
            style={{color: 'white', fontSize: 20, zIndex: 1}}
            numberOfLines={3}>
            {data?.name}
          </Text>
        </View>
        <View
          style={{flexDirection: 'row', alignItems: 'center', zIndex: 1000}}>
          <Text style={{color: 'white', fontSize: 12}}>Connected</Text>
          <View
            style={[
              styles.status,
              {backgroundColor: connected ? '#00ff08' : '#ff0000'},
            ]}
          />
        </View>
        <View style={{flex: 1}} />
        {data?.image && <ImageAnim source={data.image} />}
        {!datasensor && typeof value === 'boolean' && (
          <>
            {type === 'swipe' ? (
              <GestureSwipe value={value} onSwipeDone={onAction} />
            ) : (
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setVisible(true);
                  }}
                  style={{
                    borderRadius: 2,
                    borderWidth: 1,
                    height: 35,
                    width: 35,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                  }}>
                  <Alarm />
                </TouchableOpacity>
                <CustomSwitch
                  width={80}
                  value={value}
                  activeBgColor="#008C28"
                  inactiveBgColor="grey"
                  onPress={onAction}
                />
              </View>
            )}
          </>
        )}
      </View>
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
  },
  status: {
    height: 10,
    width: 10,
    marginLeft: 10,
    borderRadius: 100,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
  },
});

export default memo(QuickAction);
