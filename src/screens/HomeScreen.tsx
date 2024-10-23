/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import AppContainer from '../components/AppContainer';
import QuickAction from '../components/QuickAction';

const HomeScreen = () => {
  const [lockDoor, setLockDoor] = useState(false);
  const [light, setLight] = useState(false);
  return (
    <AppContainer>
      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <View style={{width: '50%'}}>
            <Text style={{color: 'white', fontSize: 28}}>Welcome</Text>
            <Text style={{color: '#BDBCBC', fontSize: 25}}>Admin</Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Image
              source={{
                uri: 'https://t4.ftcdn.net/jpg/06/31/54/63/360_F_631546389_9Ip7mK7WJB3iUNrveuLnaJWxEmemZPAI.jpg',
              }}
              style={{
                resizeMode: 'cover',
                height: 60,
                width: 60,
                borderRadius: 1000,
              }}
            />
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.text}>Quick Actions</Text>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <QuickAction
              name="Front Door"
              value={lockDoor}
              imgSrc="https://www.pirnar.in/pic/page/front-doors/wooden-models/premium-0160-model.png"
              onSwipeDone={() => setLockDoor(!lockDoor)}
            />
            <QuickAction
              name="Light"
              value={light}
              imgSrc="https://www.standardchair.com/images/HeritageLamp.png"
              onSwipeDone={() => setLight(!light)}
            />
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 28, fontWeight: '500'},
});

export default HomeScreen;
