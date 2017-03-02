import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';
import jsonpack from 'jsonpack';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import {
  DEVICE_WIDTH,
  DEVICE_HEIGHT,
  brightBlue,
} from '../consts/styles';

class QRCodeScannerContainer extends Component {


  onBarCodeReadAddToContacts(barcode) {
    const compressedData = (barcode.data);
    const extractJSONObject = jsonpack.unpack(compressedData);
    const cardId = extractJSONObject.id;
    Card.put(cardId, extractJSONObject);
    const u = User.me();
    User.put(u.id, {...u, contacts: [...u.contacts, cardId]});
    Actions.pop();
    Actions.contact({id: cardId});
  }

  render() {

    return (
      <View style={styles.container}>
        <Camera ref={(camera) => { this._camera = camera; }}
          style={styles.previewStyles}
          onBarCodeRead={this.onBarCodeReadAddToContacts.bind(this)}>
        </Camera>
        <View style={styles.cameraOverlay}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewStyles: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cameraOverlay: {
    position: 'absolute',
    borderWidth: 5,
    borderColor: brightBlue,
    top: (DEVICE_HEIGHT * 0.5) - (0.5 * (DEVICE_WIDTH * 0.75)),
    left: (DEVICE_WIDTH * 0.5) - (0.5 * (DEVICE_WIDTH * 0.75)),
    height: DEVICE_WIDTH * 0.75,
    width: DEVICE_WIDTH * 0.75,
  },
});

export default ConnectToModel(QRCodeScannerContainer, Card);
