import React, { Component } from 'react';
import { View } from 'react-native';
import AutoLinkText from './auto-link-text';

export default class ReadOnlyField extends Component {
	render() {
		const {style, textStyle, value} = this.props;
		return (
			<View style={style}>
				<AutoLinkText style={textStyle} numberOfLines={1}>
					{value}
				</AutoLinkText>
			</View>
		);
	}
}
