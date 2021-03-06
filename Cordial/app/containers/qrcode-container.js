
import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';

import {
	brightBlue,
  DISPLAY_PHOTO_ASPECT_RATIO,
  DEVICE_WIDTH
} from '../consts/styles';
import StatusBarBackground from '../components/statusbar-background';

import { Actions} from 'react-native-router-flux';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import custompack from '../utils/custompack';

const contactHeight = DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO;


class QRCodeContainer extends Component {

  constructor(props){
    super(props);
  }
  render() {
    const {displayName} = this.props;

    const {id} = this.props;
    const jsonObject = this.props.Card.byId()[id];
    const compressedJsonString = custompack.pack(jsonObject);
    return (
      <View style={{flex: 1}}>
        <StatusBarBackground />
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}> Code For {displayName}</Text>

          <Button
              onPress={Actions.pop}
              title="Done"
              color="blue"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', height: 40, justifyContent: 'center'}}>
          <QRCode
            value={compressedJsonString}
            size={DEVICE_WIDTH - 40}
            bgColor='black'
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
    color: '#ffffff',
  },
  qrcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  }
});

export default ConnectToModel(ConnectToModel(QRCodeContainer,Card), User);
