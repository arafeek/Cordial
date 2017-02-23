import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  Button
} from 'react-native';

import _ from 'lodash';
import { Actions, ActionConst} from 'react-native-router-flux';
import IconList from '../consts/icons';
import TouchableIcon, {Icon} from '../components/touchable-icon';
import {brightBlue, lightBlue} from '../consts/styles';

class ProfileContainer extends Component {

  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Your Profile</Text>
          <TouchableIcon style={styles.icon} key={'qrcode'} name={'qrcode'}  size={30}
          onPress={() => {Actions.qrcodescanner()}}/>
        </View>
        <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
          <Text>
            This is the profile page.
          </Text>
          {
          _.map(Object.keys(IconList), i => <TouchableIcon key={i} name={i} size={40} style={{flex: 0, margin: 4}}/>)
        }
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: lightBlue,
    borderBottomColor: brightBlue,
		padding: 8,
		paddingLeft: 5,
		paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
	},
	titleText: {
		fontSize: 25,
		margin: 0,
		textDecorationLine: 'none',
  },
  popUpContainer: {
		backgroundColor: brightBlue,
    padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
  },
  icon: {
    backgroundColor:lightBlue
  },
  popUp: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
    flexDirection: 'column',
    justifyContent: 'space-between'
	},
});

export default connect()(ProfileContainer);
