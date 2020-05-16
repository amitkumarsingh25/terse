import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Button,
} from 'react-native';
import { FALLBACK_IMAGE } from 'react-native-dotenv';

const { height, width } = Dimensions.get('window');

const ArticleItem = (props) => {
  let TouchableCmp = TouchableOpacity;
  // const navigation = useNavigation();

  const touchable = () => {
    console.log('View details clicked');
  };

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.articleCard}>
      <View style={styles.backContainer}>
        <ImageBackground
          source={{ uri: props.urlToImage ? props.urlToImage : FALLBACK_IMAGE }}
          style={styles.imageContainer}
          imageStyle={{ opacity: 0.3 }}
        >
          <Image
            style={styles.image}
            source={{
              uri: props.urlToImage ? props.urlToImage : FALLBACK_IMAGE,
            }}
            resizeMode='contain'
          />
        </ImageBackground>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {props.title.substr(0, props.title.lastIndexOf('-'))}
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          {props.content ? props.content.split('[')[0] : props.description}
        </Text>
      </View>
      <View style={styles.touchableContainer}>
        <TouchableCmp onPress={props.onViewMore} useForeground>
          <View style={{ width }}>
            <Text style={{ color: 'white' }}>{props.source}</Text>
            <Text style={{ color: 'white', fontSize: 10, opacity: 0.8 }}>
              Tap here to know more
            </Text>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleCard: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    // marginTop: 2,
    height: height - height / 6,
  },
  backContainer: {
    height: '45%',
    backgroundColor: 'black',
  },
  imageContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  titleContainer: {
    height: '13%',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
    padding: 10,
    marginHorizontal: 10,
  },
  descriptionContainer: {
    height: '32%',
    // paddingTop: 10,
  },
  description: {
    fontFamily: 'open-sans',
    fontSize: 14,
    padding: 10,
    marginHorizontal: 10,
  },
  touchableContainer: {
    // flex: 1,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
    // marginHorizontal: 10,
    overflow: 'hidden',
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    padding: 10,
    backgroundColor: 'black',
    opacity: 0.8,
    height: '10%',
  },
});

export default ArticleItem;
