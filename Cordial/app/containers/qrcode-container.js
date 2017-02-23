'use strict';
import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';
import { connect } from 'react-redux';

import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView
} from 'react-native';

import {
	brightBlue,
	lightBlue,
  DISPLAY_PHOTO_ASPECT_RATIO,
  GOLDEN_RATIO,
  DEVICE_WIDTH,
  FOOTER_HEIGHT
} from '../consts/styles';
import _ from 'lodash';
import { Actions, ActionConst} from 'react-native-router-flux';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model'
import {Base64String} from '../compression/Base64String'

const contactHeight = DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO;


class QRCodeContainer extends Component {

  state = {
    text: ''
  };

  render() {
    const {id, displayName} = this.props;
    var obj;
    const cards = this.props.Card.myContacts();
    for(var i = 0; i < cards.length; i++) {
      obj = cards[i];
      if(obj.id == id){
        break;
      }
    }

    var jsonString = JSON.stringify(obj);
    var compressedString = Base64String.compressToUTF16(jsonString);

    return (
      <View style={{flex: 1}}>
        <View style={styles.titleContainer}>
          <Text> Sharing... {displayName}</Text>
          <Button
              onPress={() => {
                Actions.contacts()
              }}
              title="Done"
              color="blue"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', height: 40, justifyContent: 'center'}}>
        <QRCode
            value={compressedString}
            size={200}
            bgColor='blue'
            fgColor='white'/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		height: contactHeight
	},
	titleContainer: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
	},
	titleText: {
		fontSize: 20,
		margin: 0,
		textDecorationLine: 'none',
  },
  qrcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default ConnectToModel(ConnectToModel(QRCodeContainer,Card), User);
