import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, {memo, useState} from 'react';
import Modal from 'react-native-modal';

type Props = {
  value: string;
  onBackdropPress?: () => void;
  onSwipeComplete?: () => void;
  isVisible?: boolean;
  onDone?: (value: string) => void;
};

const ModalConnect = (props: Props) => {
  const {
    value,
    onBackdropPress = () => {},
    onSwipeComplete,
    isVisible,
    onDone,
  } = props;
  const [ipAddress, setIpAddress] = useState(value);

  return (
    <Modal
      backdropTransitionOutTiming={0}
      onSwipeComplete={onSwipeComplete}
      onModalHide={() => {
        setIpAddress(value);
      }}
      swipeDirection={'down'}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      style={styles.modal}
      useNativeDriver={false}>
      <View style={styles.modalContainer}>
        <Text style={{color: 'black', fontSize: 18, textAlign: 'center'}}>
          IP Address
        </Text>
        <ScrollView style={{flex: 1}}>
          <TextInput
            value={ipAddress}
            placeholder="Enter IP Address"
            style={{borderWidth: 1, borderRadius: 14, marginTop: 10}}
            onChangeText={text => setIpAddress(text)}
          />
        </ScrollView>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={[styles.btn, {borderWidth: 1}]}
            onPress={onBackdropPress}>
            <Text style={[styles.btnText, {color: 'black'}]}>Cancel</Text>
          </TouchableOpacity>
          <View style={{width: 20}} />
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#074799'}]}
            onPress={() => {
              onBackdropPress();
              onDone?.(ipAddress);
            }}>
            <Text style={[styles.btnText, {color: 'white'}]}>Connect</Text>
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
    height: '60%',
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
});

export default memo(ModalConnect);
