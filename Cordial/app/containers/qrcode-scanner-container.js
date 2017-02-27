import React, {
  Component
} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import {Base64String} from '../compression/Base64String';

class QRCodeScannerContainer extends Component {

  onBarCodeRead(barcode) {
    var uncompressed = Base64String.decompressFromUTF16(barcode.data);
    alert('Data: ' + uncompressed);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Camera ref={(camera) => { this._camera = camera; }}
          style={styles.previewStyles}
          onBarCodeRead={this.onBarCodeRead.bind(this)}>
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

export default connect()(QRCodeScannerContainer);
