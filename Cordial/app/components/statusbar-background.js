import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Platform,
} from 'react-native';

import {brightBlue} from '../consts/styles';

export default class StatusBarBackground extends Component {
	render() {
    if (Platform.OS === 'ios') {
      return (
        <View
          style={[{
            backgroundColor: brightBlue,
            height: 20
          }
          ]}
        >
        </View>
      );
    }
    else {
      return (
        <StatusBar backgroundColor={brightBlue} />
      );
    }
	}
}

