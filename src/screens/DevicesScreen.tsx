import {Text, View} from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import QuickAction from '../components/QuickAction';

const DevicesScreen = () => {
  return (
    <AppContainer>
      <Text style={{color: 'white', fontSize: 28, fontWeight: '500'}}>
        Data Sensor
      </Text>
      <View style={{flex: 1}}>
        <View>
          <QuickAction
            datasensor
            value={false}
            type={'swipe'}
            imgSrc="https://cdn-icons-png.flaticon.com/512/2076/2076869.png"
            name="Cảm Biến Mưa"
          />
        </View>
      </View>
    </AppContainer>
  );
};

export default DevicesScreen;
