import React, {
  Component
} from 'react';
import {
  View
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
    const previewStyles = {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    };

    return (
      <View style={{flex: 1}}>
        <Camera ref={(camera) => { this._camera = camera; }}
          style={previewStyles}
          onBarCodeRead={this.onBarCodeRead.bind(this)}>
          </Camera>
      </View>
    );
  }
}

export default connect()(QRCodeScannerContainer);
