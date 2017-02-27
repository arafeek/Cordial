import React, {Component} from 'react';
import {View, Text, TouchableHighlight, ScrollView, StyleSheet} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import {Icon} from '../components/touchable-icon';
import Icons from '../consts/icons';
import {brightBlue, paleBlue, HEADER_HEIGHT} from '../consts/styles';
//TODO: implement custom field creation

const styles = StyleSheet.create({
	fieldOption:{
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,
		margin: 2,
		justifyContent: 'flex-start',
		borderWidth: 1,
		borderColor: brightBlue,
		backgroundColor: paleBlue,
	},
	fieldOptionChild: {
		padding: 4
	}
});

const FieldOption = (props) => (
	<TouchableHighlight onPress={() => props.onPress(props.field)}>
		<View style={styles.fieldOption}>
			<Icon style={styles.fieldOptionChild} name={props.field.icon} size={30}/>
			<Text style={styles.fieldOptionChild}>{props.field.displayName}</Text>
		</View>
	</TouchableHighlight>
);

class FieldPicker extends Component {
	constructor(props) {
		super(props);
		this.onSelect = this.onSelect.bind(this);
	}
	onSelect({icon, displayName}) {
		Actions.pop();
		this.props.onSelect({
			displayName,
			icon,
			value: '',
			custom: false
		});
	}
	render() {
		const iconList = _.map(Icons, ({displayName}, icon) => ({icon, displayName}));

		return (
			<ScrollView
				style={{
					flex: 1,
					top: HEADER_HEIGHT,
				}}
				contentContainerStyle={{
					justifyContent: 'flex-start',
				}}
			>
				{
					_.map(iconList, (f, i) => <FieldOption key={i} field={f} onPress={this.onSelect} />)
				}
			</ScrollView>
		);
	}
}

export default connect()(FieldPicker);
