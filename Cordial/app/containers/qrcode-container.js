
import React, { Component } from 'react';
import QRCode from 'react-native-qrcode';

import {
  Text,
  View,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native';

import {
	brightBlue,
  DISPLAY_PHOTO_ASPECT_RATIO,
  DEVICE_WIDTH
} from '../consts/styles';
import StatusBarBackground from '../components/statusbar-background';

import { Actions, ActionConst} from 'react-native-router-flux';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import {Base64String} from '../compression/Base64String';

const contactHeight = DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO;


class QRCodeContainer extends Component {

  constructor(props){
    super(props);
    this.state = {
      animating: true
    };
  }

  closeActivityIndicator() {
      setTimeout(() => {
        this.setState({animating: false});
      }, 1500);
  }

  componentDidMount() {
      this.closeActivityIndicator();
  }

  render() {
    const {id, displayName} = this.props;
    const obj = this.props.Card.byId()[id];

    var jsonString = JSON.stringify(obj);
    var compressedString = Base64String.compressToUTF16(jsonString);

    return (
      <View style={{flex: 1}}>
        <StatusBarBackground />
        <View style={styles.titleContainer}>
          <Text> Sharing... {displayName}</Text>
          <Button
              onPress={() => {
                Actions.tabbar({type:ActionConst.RESET});
                Actions.contacts();
              }}
              title="Done"
              color="blue"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', height: 40, justifyContent: 'center'}}>
          <ActivityIndicator animating = {this.state.animating} color="#0000ff" />
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
		textDecorationLine: 'none'
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
