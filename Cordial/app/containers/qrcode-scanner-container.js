import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Camera from 'react-native-camera';
import jsonpack from 'jsonpack'
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';

class QRCodeScannerContainer extends Component {


  onBarCodeReadAddToContacts(barcode) {
    var compressedData = (barcode.data);
    const extractJSONObject = jsonpack.unpack(compressedData);
    var id = extractJSONObject.id;
    id = id.split('_').join('*');
    Card.put(id, extractJSONObject);
    const u = User.me();
    User.put(u.id, {...u, contacts: [...u.contacts, extractJSONObject.id]});
    alert("Contact Added");
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
