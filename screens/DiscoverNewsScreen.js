import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import * as Source from '../constants/Sources';

const DiscoverNewsScreen = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <View style={styles.categoryContainer}>
          {Source.category.options.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Curated', {
                    source: category.title,
                  });
                }}
                useForeground
              >
                <Text>{category.title}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 10,
    justifyContent: 'space-evenly',
  },
  categoryItem: {
    backgroundColor: '#ededed',
    width: 110,
    height: 150,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.26,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DiscoverNewsScreen;
