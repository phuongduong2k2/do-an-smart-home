/* eslint-disable react-native/no-inline-styles */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

export type TDateModal = {date: Date; value: boolean};

type Props = {
  onBackdropPress?: () => void;
  onSwipeComplete?: () => void;
  isVisible?: boolean;
  onDone?: (date: Date, value: boolean) => void;
  onDelete?: () => void;
  data?: TDateModal;
};

const widthScreen = Dimensions.get('screen').width;

const ModalDate = (props: Props) => {
  const {
    onBackdropPress = () => {},
    onSwipeComplete,
    isVisible,
    onDone = () => {},
    data,
    onDelete = () => {},
  } = props;
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(false);
  return (
    <Modal
      backdropTransitionOutTiming={0}
      onSwipeComplete={onSwipeComplete}
      swipeDirection={'down'}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
      useNativeDriver={false}>
      <View style={styles.modalContainer}>
        {data && (
          <TouchableOpacity
            onLongPress={() => {
              Alert.alert(
                'Delete Schedule',
                'Are you sure want delete this schedule',
                [
                  {
                    text: 'Cancel',
                  },
                  {
                    text: 'Delete now',
                    onPress: onDelete,
                  },
                ],
              );
            }}
            style={{
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 17, color: 'black', textAlign: 'center'}}>
              It will turn{' '}
              <Text
                style={{
                  color: data.value ? '#00ff08' : '#ff0000',
                  fontWeight: '600',
                }}>
                {data.value ? 'ON' : 'OFF'}
              </Text>{' '}
              at{' '}
              <Text style={{fontWeight: '600', color: '#D91656'}}>
                {moment(data.date).format('hh:mm')}
              </Text>{' '}
              on{' '}
              <Text style={{fontWeight: '600', color: '#EB5B00'}}>
                {moment(data.date).format('dddd DD-MM-YYYY')}
              </Text>
            </Text>
          </TouchableOpacity>
        )}
        <View style={{height: 200}}>
          <DatePicker
            date={date}
            style={{borderWidth: 1, width: widthScreen - 20}}
            is24hourSource="locale"
            locale="vi"
            dividerColor="red"
            onDateChange={setDate}
          />
        </View>
        <Text style={{fontSize: 17, color: '#3B1C32', textAlign: 'center'}}>
          It will turn{' '}
          <Text
            style={{color: value ? '#00ff08' : '#ff0000', fontWeight: '600'}}>
            {value ? 'ON' : 'OFF'}
          </Text>{' '}
          at{' '}
          <Text style={{fontWeight: '600', color: '#D91656'}}>
            {moment(date).format('hh:mm')}
          </Text>{' '}
          on{' '}
          <Text style={{fontWeight: '600', color: '#EB5B00'}}>
            {moment(date).format('dddd DD-MM-YYYY')}
          </Text>
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 20,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={styles.btn2}
            onPress={() => {
              setValue(false);
            }}>
            <Text style={[styles.btnText, {color: 'black'}]}>OFF</Text>
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity
            style={[styles.btn2, {backgroundColor: '#074799'}]}
            onPress={() => {
              setValue(true);
            }}>
            <Text style={[styles.btnText, {color: 'white'}]}>ON</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.btn, {borderWidth: 1}]}
            onPress={onBackdropPress}>
            <Text style={[styles.btnText, {color: 'black'}]}>Cancel</Text>
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity
            disabled={!!data}
            style={[
              styles.btn,
              {backgroundColor: '#074799', opacity: data ? 0.5 : 1},
            ]}
            onPress={() => {
              onBackdropPress();
              if (data) {
                return;
              }
              onDone(date, value);
            }}>
            <Text style={[styles.btnText, {color: 'white'}]}>Set</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {margin: 0, justifyContent: 'flex-end'},
  modalContainer: {
    backgroundColor: 'white',
    maxHeight: '60%',
    width: '100%',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    padding: 10,
  },
  btn: {
    height: 60,
    flex: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn2: {
    borderWidth: 1,
    width: 100,
    borderRadius: 14,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalDate;
