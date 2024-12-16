/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import AppContainer from '../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Controller, {TKeyDevices} from '../components/Controller';
import {io, Socket} from 'socket.io-client';
import SensorData, {TSensorData} from '../components/SensorData';
import ModalConnect from '../components/ModalConnect';
import moment from 'moment';

let socket: Socket | null = null;

const HomeScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [lightData, setLightData] = useState('');
  const [isLightLoading, setIsLightLoading] = useState(false);
  const [data, setData] = useState<TSensorData>({
    rain: 0,
    temp: 0,
    humi: 0,
    pm10: 0,
    pm25: 0,
  });

  const insets = useSafeAreaInsets();

  const renderHeader = () => (
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
  );

  useEffect(() => {
    socket = io(`ws://${ipAddress}`, {
      transports: ['websocket'],
      reconnection: true,
    });

    socket.on('connect', () => {
      console.log('Connect success');
      setIsConnected(true);
      // handleData();
    });

    socket.on('connect_error', error => {
      console.log('Connect Error ', error.message);
      setIsConnected(false);
    });

    socket.on('disconnect', (reason, details) => {
      console.log('Disconnect ', reason, details);
      setIsConnected(false);
    });

    socket.on('sensor_data', (dataReceived: {data: TSensorData}) => {
      // console.log('Received data ', dataReceived);
      setData(dataReceived.data);
    });

    socket.on('light_data', (dataReceived: {data: string}) => {
      const status = dataReceived.data;
      const newData = status.slice(2, status.length - 1);
      if (newData.length === 4) {
        console.log(newData);
        setLightData(newData);
        setIsLightLoading(false);
      }
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [ipAddress]);

  const onBackdropPress = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleController = useCallback(
    (params: {key: TKeyDevices; value: boolean; id: number}) => {
      const sendData = `${params.id}${params.value}`;
      console.log(sendData);
      if (params.key.includes('light')) {
        socket?.emit('set_light', sendData);
        setIsLightLoading(true);
      }
      if (params.key.includes('door')) {
        socket?.emit('set_door', sendData);
      }
    },
    [],
  );

  return (
    <AppContainer style={{paddingTop: insets.top}}>
      <ModalConnect
        isVisible={isVisible}
        onBackdropPress={onBackdropPress}
        onSwipeComplete={onBackdropPress}
        value={ipAddress}
        onDone={value => setIpAddress(value)}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {renderHeader()}
        <View>
          <Text
            style={[
              styles.text,
              {color: isConnected ? '#57f542' : '#f55442', fontSize: 25},
            ]}>
            Status: {isConnected ? 'Connected' : 'Disconnected'} {'\n'}
            {ipAddress.length > 0 ? ipAddress : 'IP Address...'}
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              borderWidth: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 14,
              marginVertical: 10,
            }}
            onPress={() => setIsVisible(true)}>
            <Text style={{fontSize: 18, color: 'black'}}>
              Add IP Address now
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          title="test"
          onPress={() => {
            console.log(moment().add(30, 'minutes').format('y-M-D H:m:ss'));
          }}
        />
        <Controller
          lightData={lightData}
          isLightLoading={isLightLoading}
          isConnceted={isConnected}
          onChange={handleController}
        />
        <SensorData data={data} />
      </ScrollView>
    </AppContainer>
  );
};

const styles = StyleSheet.create({
  text: {color: 'white', fontSize: 28, fontWeight: '500'},
  contentContainerStyle: {paddingHorizontal: 20, paddingBottom: 150},
});

export default HomeScreen;
