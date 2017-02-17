import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	Image,
	TouchableHighlight,
	TextInput,
	Button,
	Navigator,
	StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

import ProfilePicture from '../components/profile-picture';
import DisplayPicture from '../components/display-picture';
import TileButton from '../components/tile-button';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import {
	brightBlue,
	lightBlue,
	DISPLAY_PHOTO_ASPECT_RATIO,
	GOLDEN_RATIO,
	DEVICE_WIDTH,
	FOOTER_HEIGHT
} from '../consts/styles';

const contactHeight = DEVICE_WIDTH / DISPLAY_PHOTO_ASPECT_RATIO;

const styles = StyleSheet.create({
	name: {
		flex: 1,
		alignSelf: 'flex-start',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: brightBlue,
		backgroundColor: lightBlue,
		left: 5,
		bottom: 5,
		position: 'absolute',
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 5,
		paddingBottom: 5,
	},
	background: {
		flex: 1,
		height: contactHeight
	},
	contact: {
		flex: 0,
		height:contactHeight
	},
	displayPhoto: {
		flex: 0,
	},
	profilePicture: {
		alignSelf: 'flex-end',
		right: 5,
		bottom: 5,
		position: 'absolute',
	},
	textInputContainer: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
	},
	textInput: {
		backgroundColor: lightBlue,
		height: 25,
		fontSize: 14,
		margin: 0,
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
		textDecorationLine: 'none',
		borderRadius: 5,
		borderWidth: 0
	}
});

class Contact extends Component {
	render() {
		const {displayName, profilePhoto, displayPhoto, style} = this.props;

		const name = <Text style={styles.name}>{displayName}</Text>;

		const profilePicture = <ProfilePicture
			size={contactHeight / GOLDEN_RATIO}
			imgID={profilePhoto}
			style={styles.profilePicture}
		/>;

		if (displayPhoto) {
			return (
				<TouchableHighlight style={styles.contact}>
					<View style={styles.background}>
						<DisplayPicture
							imgID={displayPhoto}
							style={[styles.displayPhoto, styles.background]}
						/>
						{name}
						{profilePicture}
					</View>
				</TouchableHighlight>
			);
		} else {
			const colors = [style.header.startColor, style.header.endColor];
			return (
				<TouchableHighlight style={styles.contact}>
					<LinearGradient style={styles.background}	colors={colors}>
						{profilePicture}
						{name}
					</LinearGradient>
				</TouchableHighlight>
			);
		}
	}
}

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		//this.props = props;
		this.handleSearch = this.handleSearch.bind(this);
		this.toggleMode = this.toggleMode.bind(this);
	}
	handleSearch(text) {
		this.setState({
			input: text
		});
	}
	toggleMode() {
		this.setState({
			viewPending: !this.state.viewPending
		});
	}
	render() {
		const cards = this.state.viewPending ? this.props.Card.pendingContacts() : this.props.Card.myContacts();
		return (
			<View style={{
				flex: 1,
				marginBottom: FOOTER_HEIGHT
			}}
			>
				<View style={{flex: 0, flexDirection: 'row', height: 40, justifyContent: 'center'}}>
					<TileButton onPress={this.toggleMode} isActive={!this.state.viewPending}>
						<Text>My Contacts</Text>
					</TileButton>
					<TileButton onPress={this.toggleMode} isActive={this.state.viewPending}>
						<Text>Pending Contacts</Text>
					</TileButton>
				</View>

				<View style={styles.textInputContainer}>
					<TextInput /* TODO: Add a search icon */
						onChangeText={this.handleSearch}
						value={this.state.input}
						style={styles.textInput}
						placeholder='Search'
						numberOfLines={1}
						underlineColorAndroid='rgba(0,0,0,0)'
					/>
				</View>
				<ScrollView
					style={{
						flex: 1,
					}}
					contentContainerStyle={{
						justifyContent: 'flex-start',
					}}
				>
					{
						_(cards)
						.filter(c => c.displayName.indexOf(this.state.input) !== -1)
						.map((card, key) => <Contact key={key} {...card}/>)
						.value()
					}
				</ScrollView>
			</View>
		);
	}
}

export default ConnectToModel(ConnectToModel(ContactsContainer,Card), User);
