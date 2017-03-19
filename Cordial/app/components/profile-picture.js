import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
var ImagePicker = require('react-native-image-picker');

import {brightBlue, DEFAULT_PROFILE_IMAGE} from '../consts/styles';

export default class ProfilePicture extends Component {
	constructor(props) {
		super(props);

		this.props = props;
    const {uri} = this.props;
    // unfortunately, using camera roll is pretty side-effecty
    // so it's easier to just use state to manage this
		this.state = {
			uri: uri || DEFAULT_PROFILE_IMAGE,
		};
	}

  loadImagePicker() {
    let { editable, onChange } = this.props;
    if (editable) {
      ImagePicker.showImagePicker({}, (response) => {
        if (response.uri) {
          this.setState({
            uri: response.uri,
          });
          onChange(response.uri);
        }
      });
    }
  }

	render() {
		const {size = 50, borderWidth = 4} = this.props;
    const uri = this.props.uri || this.state.uri;
    const { editable } = this.props;

    var ImageElement = ( 
          <Image
            source={{uri}}
            style={{
              height: size - 2 * borderWidth,
              width: size - 2 * borderWidth,
              resizeMode: 'stretch',
              borderRadius: (size / 2) - 5
            }}
          />);

    if (editable) {

      return (
        <View
          style={[{
            height: size,
            width: size,
            borderColor: brightBlue,
            borderRadius: size,
            borderWidth: borderWidth,
            padding: 0,
            margin: 0
          },
            this.props.style
          ]}
        >
          <TouchableOpacity
            onPress={() => {this.loadImagePicker()}}
            activeOpacity={0.7}>

            { ImageElement }

          </TouchableOpacity>
        </View>
      );
    }
    else {
      return (
        <View
          style={[{
            height: size,
            width: size,
            borderColor: brightBlue,
            borderRadius: size,
            borderWidth: borderWidth,
            padding: 0,
            margin: 0
          },
            this.props.style
          ]}
        >
          { ImageElement }
        </View>
      );
    }

	}
}

