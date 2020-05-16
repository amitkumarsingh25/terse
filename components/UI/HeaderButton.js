import React from 'react';
import {
  Platform,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const CustomHeaderButton = (props) => {
  if (props.iconPosition === 'left') {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.navigation.navigate(props.navigateTo);
        }}
        useForeground
      >
        <HeaderButton
          {...props}
          IconComponent={Ionicons}
          iconSize={20}
          color={Platform.OS === 'android' ? 'blue' : 'black'}
        />
        <Text style={styles.label}>{props.title}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => {
          props.route.name == 'Curated'
            ? props.navigation.navigate('Curated', {
                source: props.navigateTo,
              })
            : props.navigation.navigate(props.navigateTo);
        }}
        useForeground
      >
        <Text style={styles.label}>{props.title}</Text>
        <HeaderButton
          {...props}
          IconComponent={Ionicons}
          iconSize={20}
          color={Platform.OS === 'android' ? 'blue' : 'black'}
        />
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'open-sans',
    fontSize: 18,
  },
});

export default CustomHeaderButton;
