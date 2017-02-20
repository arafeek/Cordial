import React, {Component} from 'react';
import { View } from 'react-native';

import {brightBlue} from '../consts/styles';

export default class StatusBarBackground extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View
				style={[{
					backgroundColor: brightBlue,
					height: 20
				}
				]}
			>
			</View>
		);
	}
}

