import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';

import HeaderNormal from '../components/UI/HeaderNormal';
const { height } = Dimensions.get('window');
const AboutTabContents = (props) => {
  let content = '';
  if (props.route.params.title == 'Info') {
    content =
      'Version: 1.0.0 \n API used: NEWS API \n Author: Amit Singh \n Email: amitkumarsingh25@yahoo.in ';
  } else if (props.route.params.title == 'Terms & Conditions') {
    content = 'This app is for personal use and learning purpose.';
  } else if (props.route.params.title == 'Policy') {
    content =
      "This app is for personal use and learning purpose, But should not be used for commercial purposes without the Author's (Amit Singh) permissios.";
  }
  return (
    <SafeAreaView style={{ height, backgroundColor: '#f9f9f9' }}>
      <HeaderNormal
        title={props.route.params.title}
        componentType='function'
        navigation={props.navigation}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.textStyle}>{content}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'open-sans',
    fontSize: 16,
    paddingHorizontal: 16,
    marginVertical: 10,
  },
});

export default AboutTabContents;
