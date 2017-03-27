import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Icons from '../consts/icons';
import {white} from '../consts/styles';

const styles = StyleSheet.create({
	icon: {
		backgroundColor: white,
		borderWidth: 0,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export class Icon extends Component {
	render() {
		let {name, size, color} = this.props;

		if (Icons[name]) {
			if (!color) {
				color = Icons[name].color;
			}
			size *= Icons[name].scale || 1; // scale icons to somewhat standard width
		}
		return (
			<View style={[styles.icon, this.props.style]}>
				<FontAwesomeIcon name={name} size={size} color={color} style={this.props.style}/>
			</View>
		);
	}
}

export default class TouchableIcon extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress() {
		if(typeof this.props.onPress === 'function') {
			this.props.onPress();
		}
	}
	render() {
		const {size, name, style, color} = this.props;
		return (
			<TouchableOpacity onPress={this.onPress}>
				<Icon size={size} name={name} style={style} color={color}/>
			</TouchableOpacity>
		);
	}
}
