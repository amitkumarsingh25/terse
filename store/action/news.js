export const FETCH_TOP_HEADLINES = 'FETFETCH_TOP_HEADLINESCH';
export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';
export const CURATED_CATEGORY = 'CURATED_CATEGORY';

import { API_KEY } from 'react-native-dotenv';

import Article from '../../models/article';

export const fetchTopHeadlines = () => {
  return async (dispatch) => {
    try {
      const url =
        'http://newsapi.org/v2/top-headlines?' +
        'country=in&' +
        'pageSize=100&' +
        'apiKey=' +
        API_KEY;
      const response = await fetch(url);

      if (!response.ok) {
        let message = 'Something went wrong!';
        const resErrorData = await response.json();
        if (resErrorData.status == 'error') {
          message = resErrorData.message;
        }
        throw new Error(message);
      }
      const resData = await response.json();
      const fetchedArticles = resData.articles;
      const fetchedNews = [];

      for (const key in fetchedArticles) {
        let uid = Math.round(Math.random() * 1000000);
        fetchedNews.push(
          new Article(
            uid,
            fetchedArticles[key].author,
            fetchedArticles[key].title,
            fetchedArticles[key].description,
            fetchedArticles[key].url,
            fetchedArticles[key].urlToImage,
            fetchedArticles[key].publishedAt,
            fetchedArticles[key].content,
            fetchedArticles[key].source.name
          )
        );
      }
      //  to get unique values
      let uniqueFetchedNews = [...new Set(fetchedNews)];

      dispatch({ type: FETCH_TOP_HEADLINES, articles: uniqueFetchedNews });
    } catch (error) {
      throw error;
    }
  };
};

export const searchArticles = (query, pageCounter) => {
  return async (dispatch) => {
    try {
      const url =
        'http://newsapi.org/v2/everything?' +
        'qInTitle=+' +
        encodeURI(query) +
        '&pageSize=20' +
        '&page=' +
        pageCounter +
        '&apiKey=' +
        API_KEY;

      // console.log(url);

      const response = await fetch(url);
      if (!response.ok) {
        let message = 'Something went wrong!';
        const resErrorData = await response.json();
        if (
          resErrorData.status == 'error' &&
          resErrorData.code == 'maximumResultsReached'
        ) {
          message = 'No more results!';
        } else if (
          resErrorData.status == 'error' &&
          resErrorData.code == 'rateLimited'
        ) {
          message = 'Too much frequent request!';
        }
        throw new Error(message);
      }

      const resData = await response.json();
      const fetchedArticles = resData.articles;
      const fetchedNews = [];

      for (const key in fetchedArticles) {
        let uid = Math.round(Math.random() * 1000000);
        fetchedNews.push(
          new Article(
            uid,
            fetchedArticles[key].author,
            fetchedArticles[key].title,
            fetchedArticles[key].description,
            fetchedArticles[key].url,
            fetchedArticles[key].urlToImage,
            fetchedArticles[key].publishedAt,
            fetchedArticles[key].content,
            fetchedArticles[key].source.name
          )
        );
      }

      let isLoadmore = pageCounter;
      //  to get unique values
      let uniqueFetchedNews = [...new Set(fetchedNews)];
      dispatch({
        type: SEARCH_ARTICLES,
        articles: uniqueFetchedNews,
        queryParam: query,
        isLoadmore: isLoadmore,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const curatedCategoryArticles = (source, pageCounter) => {
  return async (dispatch) => {
    try {
      const url =
        'http://newsapi.org/v2/top-headlines?' +
        'country=in&' +
        'category=' +
        encodeURI(source) +
        '&pageSize=20' +
        '&page=' +
        pageCounter +
        '&apiKey=' +
        API_KEY;

      // console.log(url);

      const response = await fetch(url);
      if (!response.ok) {
        let message = 'Something went wrong!';
        const resErrorData = await response.json();
        if (
          resErrorData.status == 'error' &&
          resErrorData.code == 'maximumResultsReached'
        ) {
          message = 'No more results!';
        } else if (
          resErrorData.status == 'error' &&
          resErrorData.code == 'rateLimited'
        ) {
          message = 'Too much frequent request!';
        }
        // console.log(resErrorData);
        throw new Error(message);
      }
      const resData = await response.json();
      const fetchedArticles = resData.articles;
      const fetchedNews = [];
      if (fetchedArticles.length > 0) {
        for (const key in fetchedArticles) {
          let uid = Math.round(Math.random() * 1000000);
          fetchedNews.push(
            new Article(
              uid,
              fetchedArticles[key].author,
              fetchedArticles[key].title,
              fetchedArticles[key].description,
              fetchedArticles[key].url,
              fetchedArticles[key].urlToImage,
              fetchedArticles[key].publishedAt,
              fetchedArticles[key].content,
              fetchedArticles[key].source.name
            )
          );
        }
      }

      let isLoadmore = pageCounter;
      //  to get unique values
      let uniqueFetchedNews = [...new Set(fetchedNews)];
      dispatch({
        type: CURATED_CATEGORY,
        articles: uniqueFetchedNews,
        isLoadmore: isLoadmore,
      });
    } catch (error) {
      throw error;
    }
  };
};
