import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
} from 'react-native';

export default SettingsItem = ({ onPress, value, text }) => {
  return (
    <View style={styles.itemContainer}>
      <Switch value={value} onValueChange={onPress}/>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 5
  },
  text: {
    paddingLeft: 5,
    flex: 1,
    fontSize: 16,
  }
});
