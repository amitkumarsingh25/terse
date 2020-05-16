import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = (props) => {
  return (
    <Animated.View style={styles.searchContainer}>
      <TouchableOpacity
        style={{ flexDirection: 'row', flex: 1 }}
        onPress={props.modalHandler}
      >
        <Ionicons
          style={styles.searchIcon}
          name='ios-search'
          color='grey'
          size={24}
        />
        <Text style={{ color: '#888' }}>Search for news</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  searchContainer: {
    height: '36%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    borderRadius: 4,
    borderColor: 'blue',
  },
});

export default SearchBar;
