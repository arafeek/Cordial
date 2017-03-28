import _ from 'lodash';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Communications from 'react-native-communications';

import {Icon} from '../components/touchable-icon';
import CordialModal from '../components/cordial-modal';
import draftEmail from '../utils/emaildraft';
import { lightBlue, brightBlue } from '../consts/styles';

export default class SharingModal extends React.Component {
	constructor(props) {
		super(props);

		this.shareCard = this.shareCard.bind(this);
		this.sendEmail = this.sendEmail.bind(this);
		this.openCamera = this.openCamera.bind(this);

		this.sharingOptions = [
			{
				name: 'Share Card',
				onPress: this.shareCard,
				icon: 'qrcode'
			},
			{
				name: 'Email Contact',
				onPress: this.sendEmail,
				icon: 'envelope'
			},
			{
				name: 'Scan QR Code',
				onPress: this.openCamera,
				icon: 'camera'
			}
		];
	}

	sendEmail(){
		this.props.onRequestClose();
		const {card} = this.props;
		Communications.email(['', ''],null,null,'Contact Shared Via Cordial', draftEmail(card));
	}
	openCamera(){
		this.props.onRequestClose();
		Actions.qrcodescanner();
	}
	shareCard(){
		const {id, displayName} = this.props.card;
		this.props.onRequestClose();
		Actions.qrcode({id, displayName});
	}
	render() {
		return (
			<CordialModal
				visible={this.props.visible}
				onRequestClose={this.props.onRequestClose}
				closeButtonText='Close'
			>
				<View style={styles.sharingPanel}>
					{
						_.map(this.sharingOptions, (option, i) => (
						<TouchableOpacity key={i} onPress={option.onPress}>
							<View style={styles.shareOptionsButton}>
								<Icon
									style={styles.shareicon}
									name={option.icon}
									size={55}
								/>
								<View style={styles.shareTextButton}>
									<Text style={styles.clickableShareText} >{option.name}</Text>
								</View>
							</View>
						</TouchableOpacity>
						))
					}
				</View>
			</CordialModal>
		);
	}
}

const styles = StyleSheet.create({
	shareTextButton: {
		alignItems:'center',
		justifyContent: 'center'
	},
	shareOptionsButton:{
		justifyContent:'space-between',
		flexDirection:'row',
		borderWidth: 1,
		borderColor: brightBlue,
		paddingRight: 20,
		paddingLeft: 20
	},
	clickableShareText: {
		color: lightBlue,
		fontSize: 25,
	},
	sharingPanel: {
		width: 320,
		height: 200,
		backgroundColor: brightBlue,
		flexDirection:'column',
	},
	shareicon: {
		backgroundColor: brightBlue
	}
});
