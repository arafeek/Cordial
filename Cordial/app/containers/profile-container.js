import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Actions} from 'react-native-router-flux';

import ConnectToModel from '../models/connect-to-model';
import {Card, User} from '../models/Model';
import CardContainer from '../containers/card-container';
import TouchableIcon from '../components/touchable-icon';
import StatusBarBackground from '../components/statusbar-background';
import {brightBlue, lightBlue} from '../consts/styles';
import Communications from 'react-native-communications';
import {draftEmail} from '../utils/jsondataextraction';

class ProfileContainer extends Component {

  render() {
    // TODO: This assumes user only has one card
    const cards = Card.myCards();
    console.log('Cards:', Card.byId());
    console.log('Users:', User.byId());
    if (cards.length === 0) return <Text>No Card Found</Text>;
    return (
      <View style={{flex: 1}}>
        <StatusBarBackground />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>Your Contact Card</Text>
          <TouchableIcon
            style={styles.icon}
            key={'envelope'}
            name={'envelope'}
            size={30}
            onPress={() => {Communications.email(['', ''],null,null,'Contact Shared Via Cordial', draftEmail(_.sample(cards)));}}
          />
          <TouchableIcon
            style={styles.icon}
            key={'qrcode'}
            name={'qrcode'}
            size={30}
            onPress={() => {Actions.qrcodescanner();}}
          />
        </View>
        <CardContainer readOnly={false} id={_.sample(cards).id}/>
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

export default ConnectToModel(ProfileContainer, Card);
