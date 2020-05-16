import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
  Platform,
  ToastAndroid,
  AlertIOS,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as newsActions from '../store/action/news';
import ArticleItem from '../components/ArticleItem';

const CuratedCategoryScreen = (props) => {
  const [isArtilesLoading, setIsArtilesLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);
  const [error, setError] = useState();
  const articles = useSelector((state) => state.news.curatedArticles);
  const dispatch = useDispatch();

  const loadArticles = async (pageCount) => {
    try {
      await dispatch(
        newsActions.curatedCategoryArticles(
          props.route.params.source,
          pageCount
        )
      );
    } catch (err) {
      setError(err.message);
      // console.log(err.message);
    }
  };

  const firstRender = useCallback(
    async (pageCount) => {
      setError(null);
      setPageNumber(2);
      setIsRefreshing(true);
      loadArticles(1);
      setIsRefreshing(false);
    },
    [dispatch, setIsArtilesLoading, setError]
  );

  useEffect(() => {
    setIsArtilesLoading(true);
    firstRender(1).then(() => {
      setIsArtilesLoading(false);
    });
  }, [dispatch, firstRender]);

  const loadMoreArticles = () => {
    setPageNumber((curPageNumber) => curPageNumber + 1);
    loadArticles(pageNumber);
  };

  const notifyMessage = (msg) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      AlertIOS.alert(msg);
    }
  };

  if (error) {
    if (error != 'Something went wrong!') {
      notifyMessage(error);
    } else {
      return (
        <View style={styles.centered}>
          <Text>{error}</Text>
        </View>
      );
    }
  }

  if (isArtilesLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' color='blue' />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='black' barStyle='light-content' />
      <FlatList
        onRefresh={() => {
          firstRender(1);
        }}
        refreshing={isRefreshing}
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(itemData) => (
          <ArticleItem
            title={itemData.item.title}
            author={itemData.item.author}
            description={itemData.item.description}
            url={itemData.item.url}
            urlToImage={itemData.item.urlToImage}
            publishedAt={itemData.item.publishedAt}
            content={itemData.item.content}
            source={itemData.item.source}
            onViewMore={() => {
              props.navigation.navigate('Detail', {
                uri: itemData.item.url,
                source: itemData.item.source,
              });
            }}
          />
        )}
        onEndReached={loadMoreArticles}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CuratedCategoryScreen;
