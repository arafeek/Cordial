// A simple text field for use with redux-form
import React from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import * as baseStyles from '../consts/styles';

export default TextField = ({ input: { onChange, ...restInput }, ...rest}) => {
  return (
    <TextInput style={styles.input}
      onChangeText={onChange}
      underlineColorAndroid="transparent"
      {...restInput}
      {...rest} />
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: baseStyles.brightBlue,
    borderWidth: 2,
    height: 60,
    lineHeight: 60,
    fontSize: 24,
    margin: 10,
    alignSelf: 'stretch',
  },
})
