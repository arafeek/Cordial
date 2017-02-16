import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import {white, lightBlue, HEADER_HEIGHT} from '../consts/styles';

const styles = StyleSheet.create({
	buttonContainer: {
		flex: 1
	},
	button: {
		flex: 1,
		height: HEADER_HEIGHT,
		backgroundColor: lightBlue,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 10
	},
	buttonPressed: {
		backgroundColor: white
	},
	buttonText: {
		fontSize: 24
	}
});

export default class TileButton extends Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress() {
		if (!this.props.isActive && this.props.onPress) {
			this.props.onPress();
		}
	}
	render() {
		return (
			<TouchableOpacity	style={styles.buttonContainer} onPress={this.onPress}>
				<View style={this.props.isActive ? styles.button : [styles.button, styles.buttonPressed]}>
					{this.props.children}
				</View>
			</TouchableOpacity>
		);
	}
}
