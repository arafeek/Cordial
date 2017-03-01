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
      <View style={{flex: 1}}>
        <Camera ref={(camera) => { this._camera = camera; }}
          style={styles.previewStyles}
          onBarCodeRead={this.onBarCodeReadAddToContacts.bind(this)}>
          </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    previewStyles: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },

});

export default ConnectToModel(QRCodeScannerContainer, Card);
