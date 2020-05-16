import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import SearchBar from '../components/UI/SearchBar';

const CustomHeader = (props) => {
  const modalStateHandler = () => {
    props.navigation.navigate('Search');
  };
  const renderFeedHeader = () => {
    return (
      <View style={styles.headerNavContainer}>
        <View style={styles.headerLeft}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title={'Discover'}
              navigateTo={'Discover'}
              iconName={'ios-arrow-back'}
              navigation={props.navigation}
              iconPosition='left'
            />
          </HeaderButtons>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.headerRight}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title={''}
              navigateTo={props.title}
              iconName={'ios-refresh'}
              navigation={props.navigation}
              route={props.route}
              iconPosition='right'
            />
          </HeaderButtons>
        </View>
      </View>
    );
  };

  const renderDiscoveryHeader = () => {
    return (
      <View style={styles.headerNavContainer}>
        <View style={styles.headerLeft}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title={''}
              navigateTo={'About'}
              iconName={'md-information-circle-outline'}
              navigation={props.navigation}
              iconPosition='left'
            />
          </HeaderButtons>
        </View>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.headerRight}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title={'Feed'}
              navigateTo={'Feed'}
              iconName={'ios-arrow-forward'}
              navigation={props.navigation}
              route={props.route}
              iconPosition='right'
            />
          </HeaderButtons>
        </View>
      </View>
    );
  };
  return (
    <View>
      <View style={styles.headerContainer}>
        {props.title == 'Discover'
          ? renderDiscoveryHeader()
          : renderFeedHeader()}
        <SearchBar modalHandler={modalStateHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 94,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#fff',
    // marginBottom: 1,
  },
  headerNavContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 10,
  },
  headerLeft: {
    flex: 3,
    alignItems: 'flex-start',
  },
  headerRight: {
    flex: 3,
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans',
    fontSize: 22,
  },
});

export default CustomHeader;
