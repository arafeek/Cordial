import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  StatusBar
} from 'react-native';
import ConnectToModel from '../models/connect-to-model';
import {Card, User} from '../models/Model';
import CardContainer from '../containers/card-container';
import { Splash } from '../components/splash-screen';

//import StatusBarBackground from '../components/statusbar-background';
import {brightBlue, lightBlue} from '../consts/styles';

class ProfileContainer extends Component {

  render() {
    // TODO: This assumes user only has one card
    const cards = Card.myCards();
    if (cards.length === 0) return <Splash/>;
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor={brightBlue} />
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
