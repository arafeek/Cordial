import React, {Component} from 'react';
import {View, Image} from 'react-native';

import {brightBlue, DEFAULT_PROFILE_IMAGE} from '../consts/styles';

function uriFromID(id) { // TODO: This is a stub
	return `img/${id}`;
}

export default class ProfilePicture extends Component {
	constructor(props) {
		super(props);

		const {imgID} = props;
		this.props = props;
		this.state = {
			uri: imgID ? uriFromID(imgID) : DEFAULT_PROFILE_IMAGE
		};
	}

	render() {
		const {size = 50, borderWidth = 4} = this.props;
		const {uri} = this.state;
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
				<Image
					source={{uri}}
					style={{
						height: size - 2 * borderWidth,
						width: size - 2 * borderWidth,
						resizeMode: 'stretch',
						borderRadius: size * 2
					}}
				/>
			</View>
		);
	}
}

