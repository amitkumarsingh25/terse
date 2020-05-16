import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from 'react-native';
import { FALLBACK_IMAGE } from 'react-native-dotenv';

const { height, width } = Dimensions.get('window');

const SearchItem = (props) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View>
      <TouchableCmp onPress={props.viewMore} useForeground>
        <View style={styles.searchItemContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: props.urlToImage ? props.urlToImage : FALLBACK_IMAGE,
              }}
              resizeMode='cover'
            />
          </View>
          <View style={styles.textContainer}>
            <Text>{props.title}</Text>
          </View>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  searchItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    borderColor: 'red',
    backgroundColor: '#fff',
    marginBottom: 2,
  },
  imageContainer: {
    width: '20%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  textContainer: {
    width: '80%',
    paddingLeft: 10,
    paddingRight: 5,
    borderBottomColor: '#888',
  },
});

export default SearchItem;
