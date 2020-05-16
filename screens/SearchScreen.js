import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Dimensions,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import * as newsActions from '../store/action/news';
import SearchItem from '../components/SearchItem';

const { height, width } = Dimensions.get('screen');

const SearchScreen = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [pageNumber, setPageNumber] = useState(2);

  const searchResult = useSelector((state) => state.news.searchResult);
  const prevQueryParam = useSelector((state) => state.news.queryString);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchQuery(prevQueryParam);
  }, []);

  const searchNews = async (pageCounter) => {
    try {
      if (searchQuery != '') {
        await dispatch(newsActions.searchArticles(searchQuery, pageCounter));
      } else {
        console.log('enter search query');
      }
    } catch (error) {
      setSearchError(error.message);
    }
  };

  const loadMoreArticles = () => {
    setPageNumber((curPageNumber) => curPageNumber + 1);
    console.log(pageNumber);
    searchNews(pageNumber);
  };

  const notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  if (searchError) {
    notifyMessage(searchError);
  }

  const renderSearchResult = () => {
    return (
      <View style={styles.flatListContainer}>
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <SearchItem
              urlToImage={itemData.item.urlToImage}
              title={itemData.item.title}
              viewMore={() => {
                props.navigation.navigate('Detail', {
                  uri: itemData.item.url,
                  source: itemData.item.source,
                });
              }}
            />
          )}
          onEndReached={loadMoreArticles}
          onEndReachedThreshold={1}
        />
      </View>
    );
  };

  return (
    <View style={{ height }}>
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
        <TextInput
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          style={styles.searchInput}
          blurOnSubmit
          onSubmitEditing={() => {
            setPageNumber(2);
            searchNews(1);
          }}
        />
      </View>
      {searchResult.length !== 0 ? renderSearchResult() : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    marginBottom: 2,
  },
  searchIcon: {
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    borderRadius: 4,
  },
  flatListContainer: {
    height: '82.5%',
  },
});

export default SearchScreen;
