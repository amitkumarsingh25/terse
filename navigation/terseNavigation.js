import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import NewsOverviewScreen from '../screens/NewsOverviewScreen';
import NewsDetailScreen from '../screens/NewsDetailScreen';
import DiscoverScreen from '../screens/DiscoverNewsScreen';
import SearchScreen from '../screens/SearchScreen';
import CuratedCategoryScreen from '../screens/CuratedCategoryScreen';
import AboutScreen from '../screens/About';
import AboutTabContentScreen from '../screens/AboutTabContents';

// import HeaderButton from '../components/UI/HeaderButton';
import CustomHeader from '../components/CustomHeader';

const Stack = createStackNavigator();

export default function HomeStack(props) {
  return (
    <Stack.Navigator
      initialRouteName='Terse'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
      }}
      headerMode='screen'
    >
      <Stack.Screen
        name='Feed'
        component={NewsOverviewScreen}
        options={{
          header: ({ navigation, scene }) => (
            <CustomHeader
              navigation={navigation}
              route={scene.route}
              title='Feed'
            />
          ),
        }}
      />
      <Stack.Screen
        name='Detail'
        component={NewsDetailScreen}
        options={({ route }) => ({ title: route.params.source })}
      />
      <Stack.Screen
        name='Discover'
        component={DiscoverScreen}
        options={{
          header: ({ navigation, scene }) => (
            <CustomHeader
              navigation={navigation}
              route={scene.route}
              title='Discover'
            />
          ),
        }}
      />
      <Stack.Screen
        name='Curated'
        component={CuratedCategoryScreen}
        options={{
          header: ({ navigation, scene }) => {
            const { source } = scene.route.params;
            return (
              <CustomHeader
                navigation={navigation}
                route={scene.route}
                title={source}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name='Search'
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='About'
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AboutContent'
        component={AboutTabContentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
