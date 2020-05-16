import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const HeaderNormal = (props) => {
  return (
    <View style={styles.searchContainer}>
      <Ionicons
        style={styles.searchIcon}
        name='ios-arrow-round-back'
        color='grey'
        size={28}
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.headerLabel}>{props.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: '8%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 2,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -10,
  },
  headerLabel: {
    fontFamily: 'open-sans',
    fontSize: 22,
  },
});

export default HeaderNormal;
