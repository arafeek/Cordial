import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import TouchableIcon from './touchable-icon';
import {
  white,
  lightBlue,
  paleBlue,
  brightBlue,
} from '../consts/styles';

// TODO: Make this part of a proper redux-form
export default class EditableField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: this.props.value,
		};
		this.onFieldChange = this.onFieldChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}
	onDelete() {
		this.props.onDelete();
	}
	onFieldChange(v) {
		this.setState({input: v});
		this.props.onChange(v);
	}
	render() {
		const {deleteAllowed} = this.props;

		return (
			<View style={this.props.style}>
				<TextInput
					style={styles.textField}
					value={this.state.input}
					onChangeText={this.onFieldChange}
					onSubmitEditing={this.onEndEditing}
					underlineColorAndroid='transparent'
				/>
				{deleteAllowed &&
					<TouchableIcon
						style={styles.clickableIcon}
						color={brightBlue}
						size={20} name='trash-o'
						onPress={this.onDelete}/>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	clickableIcon: {
		paddingRight: 2,
		backgroundColor: paleBlue,
	},
	textField: {
		backgroundColor: white,
		fontSize: 20,
		height: 28,
		margin: 0,
		paddingVertical: 1,
		paddingHorizontal: 8,
		textDecorationLine: 'none',
		borderColor: lightBlue,
		borderWidth: 1,
		flex: 1,
		lineHeight: 28,
	},
});
