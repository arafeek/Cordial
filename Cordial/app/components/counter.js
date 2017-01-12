import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

export const Counter = ({counter, increment, decrement}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> {counter} </Text>
      <TouchableOpacity onPress={increment}
        style={styles.button}>
        <Text> + </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={decrement}
        style={styles.button}>
        <Text> - </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  }
});

