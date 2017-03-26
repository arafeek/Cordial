import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import {lightBlue, brightBlue} from '../consts/styles';

export default class CordialModal extends React.Component {
	render() {
		const {
			children,
			visible,
			onRequestClose,
			closeButtonText
		} = this.props;

		return (
			<Modal
			animationType={'slide'}
			transparent={true}
			visible={visible}
			onRequestClose={onRequestClose}
			>
				<View style={styles.modalContainer}>
					<View style={styles.modal}>
						{children}
						<TouchableOpacity onPress={onRequestClose}>
							<View style={styles.closeButton}>
								<Text style={styles.closeButtonText}>{closeButtonText}</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		);
	}
}


const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		backgroundColor: brightBlue,
		padding: 5,
	},
	closeButton: {
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: lightBlue
	},
	closeButtonText: {
		fontSize: 20,
	}
});
