import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	TextInput,
	StyleSheet,
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import StatusBarBackground from '../components/statusbar-background';
import filter from '../utils/filter';
import ProfilePicture from '../components/profile-picture';
import DisplayPicture from '../components/display-picture';
import TileButton from '../components/tile-button';
import {Card, User} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import { SwipeRow } from 'react-native-swipe-list-view';
import TouchableIcon from '../components/touchable-icon';
import AutoLinkIcon from '../components/auto-link-icon.js';
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
    paddingTop: 20,
    fontSize: 28,
    fontWeight: 'bold',
	},
  contactBackground: {
		flex: 1,
    flexDirection: 'row',
	},
	contact: {
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: '#dddddd',
    padding: 5,
    paddingTop: 10,
    paddingBottom: 10,
	},
	displayPhoto: {
		flex: 1,
	},
  flexLeftContainer: {
    flexDirection: 'column-reverse',
    justifyContent: 'space-between',
    paddingLeft: 15,
    flex: 1,
  },
	profilePicture: {
		alignSelf: 'flex-end',
	},
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 10,
  },
	textInputContainer: {
		backgroundColor: brightBlue,
		padding: 8,
		paddingLeft: 20,
		paddingRight: 20,
		borderColor: lightBlue,	
		borderWidth: 2
	},
	textInput: {
		backgroundColor: lightBlue,
		height: 30,
		fontSize: 14,
		margin: 0,
		padding: 2,
		paddingLeft: 8,
		paddingRight: 8,
		textDecorationLine: 'none',
    borderTopWidth: 1,
    borderBottomWidth: 5,
    borderColor: '#dddddd',
		borderRadius: 5,
		borderWidth: 0
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8b8b83',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	}
});

class Contact extends Component {
	constructor(props) {
		super(props);
		this.openContact = this.openContact.bind(this);
	}
	openContact() {
		Actions.contact({id: this.props.id});
	}

	onDeleteContact(cardId){
		var cards = Card.myContacts();
		
		var newCards = _.map(cards, function(card) {
			if (card.id !== cardId) return card.id;
		});

		newCards = _.without(newCards, undefined);

		const u = User.me();
		User.put(u.id, {...u, contacts: newCards});
	}

	render() {
    const {
      id,
      displayName,
      profilePhoto,
      displayPhoto,
      fields,
    } = this.props;

		return (
		<SwipeRow
				leftOpenValue={0}
				rightOpenValue={-75}
		>
				<View style={styles.standaloneRowBack}>
					<Text style={styles.backTextWhite}></Text>
						<TouchableIcon 
						style={{backgroundColor:'#8b8b83'}}
						size={30} name='trash-o'
						onPress={ () => {this.onDeleteContact(id);}}/>
				</View>
				<TouchableHighlight style={styles.contact} onPress={this.openContact}>
					<View style={styles.contactBackground}>
            <View style={styles.flexLeftContainer}>
              <View style={styles.iconContainer}>
                <TouchableIcon size={50}
                  name="qrcode"
                  onPress={() => { Actions.qrcode({id, displayName});}}
                  style={styles.contactIcon} />
                {
                _.take(fields, 3)
                .map((field, key) => <AutoLinkIcon size={50} name={field.icon} value={field.value} key={key} style={styles.icon} />)
                }
              </View>
              <Text style={styles.name}>
                {displayName}
              </Text>
            </View>
						<ProfilePicture
							size={contactHeight / GOLDEN_RATIO}
							uri={profilePhoto}
							style={styles.profilePicture}
						/>
					</View>
				</TouchableHighlight>
			</SwipeRow>
		);
	}
}

class ContactsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
		this.handleSearch = this.handleSearch.bind(this);
	}
	handleSearch(text) {
		this.setState({
			input: text
		});
	}

	render() {
		const cards = this.props.Card.myContacts();
		return (
			<View style={{
				flex: 1,
				marginBottom: FOOTER_HEIGHT
			}}
			>
				<StatusBarBackground />

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
						_(filter(cards, this.state.input))
						.map((card, key) => <Contact key={key} {...card}/>)
						.value()
					}
				</ScrollView>
			</View>
		);
	}
}

export default ConnectToModel(ConnectToModel(ContactsContainer,Card), User);
