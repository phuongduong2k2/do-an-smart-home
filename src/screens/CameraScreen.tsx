/* eslint-disable react-native/no-inline-styles */
import {Text, View} from 'react-native';
import React from 'react';
import AppContainer from '../components/AppContainer';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

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

  return (
    <AppContainer style={{paddingTop: insets.top}}>
      <Text style={{color: 'white', fontSize: 28, fontWeight: '500'}}>
        Surveillance Camera
      </Text>
      <View style={{flex: 1, backgroundColor: '#181818'}}>
        {/* <View style={{height: '55%'}}> */}
        <WebView
          source={{uri: 'http://192.168.9.236/ '}}
          injectedJavaScript={jsCode}
          javaScriptEnabled={true}
        />
        {/* </View> */}
      </View>
    </AppContainer>
  );
};

export default CameraScreen;
