import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Platform
} from 'react-native';
import { bindActionCreators } from 'redux';
import React, {Component} from 'react';
import _ from 'lodash';
import {Actions, ActionConst} from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as authActions from '../actions/auth';

import ReadOnlyField from '../components/read-only-field';
import EditableField from '../components/editable-field';
import WithKeyboard from '../hoc/with-keyboard';
import DisplayPicture from '../components/display-picture';
import ProfilePicture from '../components/profile-picture';
import TileButton from '../components/tile-button';
import ActivityIndicatorOverlay from '../components/activity-indicator-overlay';
import {User, Card} from '../models/Model';
import {Icon} from '../components/touchable-icon';
import AutolinkIcon from '../components/auto-link-icon';
import SharingModal from '../components/sharing-modal';
import CordialModal from '../components/cordial-modal';
import CardSelector from '../components/card-selector';

import {
	DEVICE_WIDTH,
	brightBlue,
	lightBlue,
	paleBlue,
	brightRed,
	lightRed,
	white,
	FOOTER_HEIGHT
} from '../consts/styles';
import * as onlineStorage from '../firebase';

const profilePictureSize= DEVICE_WIDTH / 2.5;

class CardContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			card: Card.byId()[this.props.id],
			id: this.props.id,
			modalVisible: false,
			fieldModal: {visible: false},
      loading: false,
      showCards: false
		};
		this.enableEdit = this.enableEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.addField = this.addField.bind(this);
		this.openFieldPicker = this.openFieldPicker.bind(this);
		this.createNewCard = this.createNewCard.bind(this);
		this.toggleCards = this.toggleCards.bind(this);
		this.selectCard = this.selectCard.bind(this);
		this.deleteCard = this.deleteCard.bind(this);
	}
	enableEdit(id) {
		Actions.cardeditor(id);
	}
	cancelEdit() {
		Actions.pop();
	}
	submitEdit() {
    this.setState({
      loading: true,
    })
		const id = this.state.id;
    onlineStorage.uploadImage(this.state.card.id,this.state.card.profilePhoto)
      .then((url) => {
        // TODO: show loading indicator
        console.log('Image uploaded! Can be found at:', url);
        Card.put(id, {
          ...this.state.card,
          profilePhoto: url,
        });
        this.cancelEdit();
      })
      .catch((error) => {
        // TODO: tell the user their photo wasn't uploaded
        Card.put(id, this.state.card);
        this.cancelEdit();
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
	}
	openFieldPicker() {
		Actions.fieldpicker({onSelect: this.addField});
	}
	addField(field) {
		const {card} = this.state;
		const fields = [...card.fields, field];
		this.setState({card: {...card, fields}});
	}
	onChangeField(fieldIndex, newValue) {
		const {card} = this.state;
		const newFields = _.map(card.fields, (f, i) => (i === fieldIndex ? {...f, value: newValue} : f));
		this.setState({card: {...card, fields: newFields}});
	}
	onChangeProp(prop, value) {
		const {card} = this.state;
		this.setState({card: {...card, [prop]: value}});
	}
	onDeleteField(fieldIndex) {
		const {card} = this.state;
		const newFields = _.filter(card.fields, (f, i) => (i !== fieldIndex));
		this.setState({card:{...card, fields: newFields}});
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}

	createNewCard(name, number, email) {
		this.props.actions.createCard(name, number, email);
	}

	toggleCards(){
		this.setState({showCards: !this.state.showCards});
	}

	selectCard(id){
		this.setState({id});
		this.toggleCards();
		//Actions.profile({id});
	}

	deleteCard(){
		// Actions.profile({type: ActionConst.REPLACE});
		var cards = Card.myCards();
		console.log('CARDS: ', cards);

		var newCards = _.map(cards, (card) => {
			if (card.id !== this.state.id) return card.id;
		});

		newCards = _.without(newCards, undefined);

		const u = User.me();
		User.put(u.id, {...u, cards: newCards});

		this.cancelEdit();
		//this.selectCard(newCards[0]);
		// Actions.profile({id: newCards[0], type: ActionConst.REFRESH});
		this.props.actions.deleteCard(this.state.card.id);
		console.log('NEW ID: ', newCards[0]);
		// this.setState({id: newCards[0]});
		// Actions.profile({id: newCards[0].id, type: ActionConst.REPLACE});
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	if (!Card.byId()[nextState.id]) {
	// 		return false;
	// 	}
	// 	return true;
	// }

	render() {
		const {readOnly, editMode, keyboardOpen} = this.props;
		const showCards = this.state.showCards;
		console.log('ID: ', this.state.id);
		let card = editMode ? this.state.card : Card.byId()[this.state.id];
		const cards = Card.myCards();
		if (!card) {
			console.log('changing card');
			card = Card.byId()[cards[0].id];
			console.log('new cards ', card);
		}
		const Field = editMode ? EditableField : ReadOnlyField;
		const {
			profilePhoto,
			displayPhoto,
			displayName,
			fields,
			type
		} = card;
		const userCompactProfileView = this.props.settings.useCompactProfileView.value;


		// console.log('THIS IS MY CARD');
		// console.log(card);
		// console.log('*****************');
		// console.log(cards);

		return (
			<View style={[styles.cardContainer, {marginBottom: editMode ? 0 : FOOTER_HEIGHT}]}>

        <ActivityIndicatorOverlay animating={this.state.loading}
          style={styles.loadingIndicator} />
				{ editMode  && !keyboardOpen &&
				<View style={styles.editTray}>
					<TileButton style={[styles.submitButton, {backgroundColor: lightBlue}]} onPress={this.submitEdit}>
						<Text style={styles.tileButtonText}>Save</Text>
					</TileButton>
					<TileButton style={[styles.submitButton, {backgroundColor: paleBlue}]} onPress={this.cancelEdit}>
						<Text style={styles.tileButtonText}>Cancel</Text>
					</TileButton>
				</View>
				}
				<DisplayPicture style={styles.displayPicture} uri={displayPhoto}/>
				<View style={styles.displayPictureBorder}/>
				{!readOnly && !editMode &&
					<View >
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
							<SharingModal
								onRequestClose={() => this.setModalVisible(!this.state.modalVisible)}
								visible={this.state.modalVisible}
								card={card}
							/>
							<CordialModal
								visible={this.state.fieldModal.visible}
								onRequestClose={() => this.setState({fieldModal: {...this.state.fieldModal, visible: false}})}
								closeButtonText='Ok'
							>
								<View style={{width: 320, height: 100, justifyContent: 'space-around', alignItems: 'center'}}>
									<Text style={{fontSize: 30}}>{this.state.fieldModal.title}</Text>
									<Text style={{fontSize: 20}}>{this.state.fieldModal.text}</Text>
								</View>
							</CordialModal>
						</View>
						<View style={styles.optionButtons}>
							<TouchableOpacity	onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
								<View style={styles.shareButton}>
									<Icon style={styles.clickableIcon} color={brightBlue} size={20} name='share'/>
									<Text style={styles.clickableText} >Share</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity	onPress={() => {this.enableEdit(card.id);}}>
								<View style={styles.editButton}>
									<Icon style={styles.clickableIcon} color={brightBlue} size={20} name='pencil'/>
									<Text style={styles.clickableText} >Edit</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				}
				{!readOnly && !editMode && !showCards &&
					<TouchableOpacity
						style={styles.myCards}
						onPress={this.toggleCards}>
							<View style={{height: 35, justifyContent: 'space-around'}}>
								<Text style={styles.myCardsText}>My Cards</Text>
							</View>
					</TouchableOpacity>
				}
				{!readOnly && !editMode && showCards &&
					<CardSelector
						createCard={this.createNewCard}
						closeTray={this.toggleCards}
						currentCard={card.id}
						selectCard={this.selectCard}
					/>
				}
				{!readOnly && editMode &&
					<View style={styles.optionButtons}>
						{cards.length > 1 &&
							<TouchableOpacity	onPress={this.deleteCard}>
								<View style={styles.deleteCard}>
									<Text style={styles.deleteCardText}>Delete Card</Text>
								</View>
							</TouchableOpacity>
						}
						<Field
							style={styles.cardType}
							textStyle={{fontSize: 12, lineHeight: 12}}
							customStyle={true}
							value={type}
							onChange={(v) => this.onChangeProp('type', v)}
						/>
					</View>
				}
				<ProfilePicture
					size={profilePictureSize}
					uri={profilePhoto}
					style={styles.profilePicture}
          editable={editMode && !readOnly}
          onChange={(v) => this.onChangeProp('profilePhoto', v)}
				/>
				<Field
					style={styles.displayName}
					textStyle={{fontSize: 24}}
					value={displayName}
					onChange={(v) => this.onChangeProp('displayName', v)}
				/>
				<ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
					{(userCompactProfileView && !editMode) ?
						<View style={styles.iconsContainer}>
							{
							_.map(fields, (f, key) => (
								<AutolinkIcon
									key={key}
									style={styles.linkIcon}
									size={DEVICE_WIDTH / 4}
									name={f.icon}
									value={f.value}
									noLinkOnPress={() => this.setState({
										fieldModal: {
											visible: true,
											title: f.displayName,
											text: f.value
										}
									})}
									displayName={f.displayName}/>
							))
							}
						</View>
						:
					<View style={styles.fieldGrid}>
						<View style={styles.fieldKeys}>
							{
								_.map(fields, (f, key) => <Text style={[styles.field, styles.fieldText, {height: 36}]} key={key}>{f.displayName + ':'}</Text>)
							}
						</View>
						<View style={styles.fieldValues}>
							{
								_.map(fields, (props, key) => (
									<Field
										readOnly={readOnly}
										deleteAllowed
										key={key}
										{...props}
										onChange={(val) => this.onChangeField(key, val)}
										onDelete={() => this.onDeleteField(key)}
										style={styles.field}
										textStyle={styles.fieldText}
									/>
								))
							}
						</View>
					</View>
					}
					{ editMode &&
						<View>
						<TouchableOpacity	style={{paddingTop: 10}}onPress={this.openFieldPicker}>
							<Text style={styles.addMore}>Add More</Text>
						</TouchableOpacity>
						</View>
					}
				</ScrollView>
			</View>
		);

	}
}

const styles = StyleSheet.create({
	cardContainer: {
		justifyContent: 'flex-start',
		backgroundColor: paleBlue,
		flex: 1,
		paddingBottom: 5
	},
	editButton: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingRight: 15,
	},
	shareButton: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingLeft: 15,
	},
	profilePicture: {
		alignSelf: 'center',
		position: 'relative',
		top: (profilePictureSize / -2) - 30
	},
	displayName: {
		alignSelf: 'center',
		marginTop: profilePictureSize / -2 -10,
		paddingHorizontal: 5,
		flexDirection: 'row',
	},
	displayPicture: {
		//zIndex: 0
	},
	displayPictureBorder: { // I am sorry for these hax
		borderWidth: 2, // borderBottomWidth doesn't seem to work
		borderColor: brightBlue,
	},
	scrollContainer: {
		justifyContent: 'flex-start',
	},
	fieldGrid: {
		flexDirection: 'row',
		paddingHorizontal: 10,
		marginTop: 20,
	},
	fieldKeys: {
		flex: 0,
		marginLeft: 5,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	fieldValues: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start'
	},
	field: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingVertical: 2,
		flex: 1,
		paddingLeft: 5,
		height: 36
	},
	clickableIcon: {
		paddingRight: 2,
		backgroundColor: paleBlue,
	},
	clickableText: {
		color: brightBlue,
		fontSize: 16
	},
	fieldText: {
		fontSize: 20,
		flex: 0
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
	editTray: {
		flexDirection: 'row',
		flex: 0,
		height: FOOTER_HEIGHT,
		alignItems: 'center',
	},
	submitButton: {
		borderWidth: 1,
		borderColor: brightBlue,
	},
	addMore: {
		flex: 0,
		alignSelf: 'center',
		textAlign: 'center',
		borderWidth: 1,
		borderColor: brightBlue,
		backgroundColor: lightBlue,
		borderRadius: 5,
		width: 200,
		overflow: 'hidden',
		fontSize: 18,
	},
	tileButtonText: {
		fontSize: 20
	},
	optionButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	iconsContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		backgroundColor: paleBlue,
	},
	shareTextButton: {
		alignItems:'center',
		justifyContent: 'center',
  },
	linkIcon: {
		backgroundColor: paleBlue,
	},
	modal: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeButton:{
		flex: 0.10,
		backgroundColor: brightBlue,
		alignItems: 'center'
	},
	shareicon: {
		backgroundColor: brightBlue
	},
	sharingPanel: {
		width: 320,
		height: 250,
		backgroundColor: brightBlue,
		flexDirection:'column',
	},
	clickableShareText: {
		color: lightBlue,
		fontSize: 25,
	},
	shareOptionsButton:{
		justifyContent:'space-between',
		flexDirection:'row',
		borderWidth: 1,
		borderColor: brightBlue,
		paddingRight: 20,
		paddingLeft: 20
	},
	myCards: {
    position: 'absolute',
    ...Platform.select({ios: {zIndex: 3}, android: {elevation: 3}}),
		borderWidth: 1,
		borderRadius: 8,
		borderColor: brightBlue,
		backgroundColor: lightBlue,
		width: 100,
		top: 20,
		left: 10,
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	myCardsText: {
		fontSize: 12,
		alignSelf: 'center'
	},
	deleteCard: {
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 10,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: brightRed,
		backgroundColor: lightRed,
		height: 25,
		width: 85,
		justifyContent: 'space-around',
		overflow: 'hidden',
	},
	deleteCardText: {
		fontSize: 12,
		alignSelf: 'center',
	},
	cardType: {
		height: 25,
		width: 85,
		marginTop: 10,
		marginRight: 10,
	},
	cardTypeField: {
		backgroundColor: white,
		fontSize: 12,
		height: 25,
		margin: 0,
		paddingVertical: 1,
		paddingHorizontal: 8,
		textDecorationLine: 'none',
		borderColor: lightBlue,
		borderWidth: 1,
		flex: 1,
		lineHeight: 25,
	},
});

export default connect(
	({settings, model, auth}) => ({
		settings,
		model,
		auth
	}),
	(dispatch) => ({
		actions: bindActionCreators({
			...authActions,
		}, dispatch)
	})
)(WithKeyboard(CardContainer), Card);
