import React from 'react';
import { View } from 'react-native';
// import { WebView } from 'react-native-webview';
import ProgressWebView from 'react-native-progress-webview';
const NewsDetailScreen = (props) => {
  const { uri } = props.route.params;
  return (
    <View style={{ flex: 1 }}>
      <ProgressWebView source={{ uri: uri }} style={{ flex: 1 }} />
    </View>
  );
};

export default NewsDetailScreen;
