/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React, {useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useAppSelector} from '../hooks';

const jsCode = `
    const toggleStreamButton = document.getElementById('toggle-stream');
    const toggleNav = document.getElementById('nav-toggle');
    const resolution = document.getElementById('framesize');
    if (toggleStreamButton) {
      toggleStreamButton.click(); // Simulate a click event
    }
    if (toggleNav) {
      toggleNav.click();
      // toggleNav.style.opacity = 0;
    }
    if (resolution) {
      resolution.value = "8";
    }
    true; // Ensure the script returns true
  `;

const CameraScreen = () => {
  const insets = useSafeAreaInsets();
  const {ipAddress} = useAppSelector(state => state.app);

  const cameraHost = useMemo(() => {
    if (ipAddress && ipAddress?.length > 0) {
      const splitValue = ipAddress.split('.');
      return `${splitValue[0]}.${splitValue[1]}.${splitValue[2]}.236`;
    }
    return '';
  }, [ipAddress]);

  return (
    // <AppContainer style={{paddingTop: insets.top}}>
    <View style={{flex: 1, paddingTop: insets.top, backgroundColor: '#181818'}}>
      <Text style={{color: 'white', fontSize: 28, fontWeight: '500'}}>
        Surveillance Camera
      </Text>
      <Text style={{color: 'white'}}>
        Running on IP:{' '}
        {ipAddress && ipAddress?.slice(0, ipAddress.length - 9) + '.236'}
      </Text>
      <View style={{flex: 1, backgroundColor: '#181818'}}>
        <WebView
          style={{flex: 1}}
          source={{uri: cameraHost}}
          injectedJavaScript={jsCode}
          javaScriptEnabled={true}
        />
      </View>
    </View>
    // </AppContainer>
  );
};

export default CameraScreen;
