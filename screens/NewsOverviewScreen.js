import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import * as newsActions from '../store/action/news';
import ArticleItem from '../components/ArticleItem';
// import HeaderStatusBar from '../components/HeaderStatusBarColor';

const NewsOverviewScreen = (props) => {
  const [isArtilesLoading, setIsArtilesLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const articles = useSelector((state) => state.news.articles);
  const dispatch = useDispatch();

  const loadArticles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(newsActions.fetchTopHeadlines());
    } catch (err) {
      setError(err.message);
      // console.log(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsArtilesLoading, setError]);

  useEffect(() => {
    setIsArtilesLoading(true);
    loadArticles().then(() => {
      setIsArtilesLoading(false);
    });
  }, [dispatch, loadArticles]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Something messed up the wires!</Text>
      </View>
    );
  }

  if (isArtilesLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar backgroundColor='black' barStyle='light-content' />
      {/* <HeaderStatusBar backgroundColor='black' barStyle='light-content' /> */}
      <FlatList
        onRefresh={loadArticles}
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default NewsOverviewScreen;
