import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';

import ReadOnlyField from '../components/read-only-field';
import EditableField from '../components/editable-field';
import WithKeyboard from '../hoc/with-keyboard';
import DisplayPicture from '../components/display-picture';
import ProfilePicture from '../components/profile-picture';
import TileButton from '../components/tile-button';
import ActivityIndicatorOverlay from '../components/activity-indicator-overlay';
import {Card} from '../models/Model';
import {Icon} from '../components/touchable-icon';
import AutolinkIcon from '../components/auto-link-icon';
import SharingModal from '../components/sharing-modal';
import CordialModal from '../components/cordial-modal';

import {
	DEVICE_WIDTH,
	brightBlue,
	lightBlue,
	paleBlue,
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
			modalVisible: false,
			fieldModal: {visible: false},
      loading: false,
		};
		this.enableEdit = this.enableEdit.bind(this);
		this.cancelEdit = this.cancelEdit.bind(this);
		this.submitEdit = this.submitEdit.bind(this);
		this.addField = this.addField.bind(this);
		this.openFieldPicker = this.openFieldPicker.bind(this);
	}
	enableEdit() {
		Actions.cardeditor();
	}
	cancelEdit() {
		Actions.pop();
	}
	submitEdit() {
    this.setState({
      loading: true,
    })
		const id = this.props.id;
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
		
		this.onChangeField(fieldIndex, 'newValue');
		const {card} = this.state;
		const newFields = _.filter(card.fields, (f, i) => (i !== fieldIndex));
		this.setState({card:{...card, fields: newFields}});
	}
	setModalVisible(visible) {
		this.setState({modalVisible: visible});
	}
	render() {
		const {readOnly, editMode, keyboardOpen} = this.props;
		const card = editMode ? this.state.card : Card.byId()[this.props.id];
		const Field = editMode ? EditableField : ReadOnlyField;
		const {
			profilePhoto,
			displayPhoto,
			displayName,
			fields
		} = card;
		const userCompactProfileView = this.props.settings.useCompactProfileView.value;

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
							<TouchableOpacity	onPress={this.enableEdit}>
								<View style={styles.editButton}>
									<Icon style={styles.clickableIcon} color={brightBlue} size={20} name='pencil'/>
									<Text style={styles.clickableText} >Edit</Text>
								</View>
							</TouchableOpacity>
						</View>
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
		zIndex: 1000,
	},
	shareButton: {
		flexDirection: 'row',
		paddingTop: 10,
		paddingLeft: 15,
		zIndex: 1000,
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
	}
});

export default connect(({settings, model}) => ({settings, model}))(WithKeyboard(CardContainer), Card);
