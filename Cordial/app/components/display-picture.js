import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {DEFAULT_DISPLAY_IMAGE, DISPLAY_PHOTO_ASPECT_RATIO, DEVICE_WIDTH} from '../consts/styles';

function uriFromID(id) { // TODO: This is a stub
	return `img/${id}`;
}

export default class DisplayPicture extends Component {
	constructor(props) {
		super(props);
		const {imgID} = props;
		this.props = props;
		this.state = {
			uri: /*imgID ? uriFromID(imgID) :*/ DEFAULT_DISPLAY_IMAGE // TODO: Make this work
		};
	}

	render() {
		const {uri} = this.state;
		return (
			<Image
				source={{uri}}
				style={[
					{
						height: DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO,
						width: DEVICE_WIDTH,
						resizeMode: 'cover'
					},
					this.props.style
				]}
			/>
		);
	}
}

