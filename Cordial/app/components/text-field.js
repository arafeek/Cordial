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
    height: 40,
    width: 250,
    lineHeight: 60,
    fontSize: 20,
    margin: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
})
