import React, { Component } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const { height } = Dimensions.get('window');
import { aboutTabs } from '../constants/Sources';
import HeaderNormal from '../components/UI/HeaderNormal';
export default class Settings extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={{ height, backgroundColor: '#f9f9f9' }}>
        <HeaderNormal
          title='About'
          componentType='class'
          navigation={this.props.navigation}
        />
        <View style={{ flex: 1 }}>
          <ScrollView>
            {aboutTabs.options.map((item) => (
              <View style={styles.optionContainer} key={item.id}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('AboutContent', {
                      title: item.title,
                    });
                  }}
                >
                  <Text style={styles.textStyle}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontFamily: 'open-sans',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  optionContainer: {
    marginVertical: 10,
    borderBottomColor: '#888',
    borderBottomWidth: 0.5,
  },
});
