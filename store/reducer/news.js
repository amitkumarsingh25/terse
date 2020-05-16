import { FETCH_TOP_HEADLINES } from '../action/news';
import { SEARCH_ARTICLES } from '../action/news';
import { CURATED_CATEGORY } from '../action/news';

const initialState = {
  articles: [],
  searchResult: [],
  curatedArticles: [],
  queryString: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_HEADLINES:
      return { ...state, articles: action.articles };
    case SEARCH_ARTICLES:
      let newArticles = [];
      if (action.isLoadmore > 1) {
        newArticles = [...state.searchResult, ...action.articles];
      } else {
        newArticles = [...action.articles];
      }
      return {
        ...state,
        searchResult: newArticles,
        queryString: action.queryParam,
      };
    case CURATED_CATEGORY:
      let newCuratedArticles = [];
      if (action.articles.length) {
        if (action.isLoadmore > 1) {
          newCuratedArticles = [...state.curatedArticles, ...action.articles];
        } else {
          newCuratedArticles = [...action.articles];
        }
      } else {
        newCuratedArticles = [...state.curatedArticles];
      }

      return {
        ...state,
        curatedArticles: newCuratedArticles,
      };
  }
  return state;
};
