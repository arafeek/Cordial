import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	ScrollView
} from 'react-native';
import React, {Component} from 'react';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

import WithKeyboard from '../hoc/with-keyboard';
import ConnectToModel from '../models/connect-to-model';
import TouchableIcon, {Icon} from '../components/touchable-icon';
import DisplayPicture from '../components/display-picture';
import ProfilePicture from '../components/profile-picture';
import TileButton from '../components/tile-button';
import {Card} from '../models/Model';
import {
	DEVICE_WIDTH,
	brightBlue,
	lightBlue,
	paleBlue,
	white,
	FOOTER_HEIGHT
} from '../consts/styles';

const ReadOnlyField = (props) => (
	<View style={props.style}>
		<Text
			style={props.textStyle}
			numberOfLines={1}
			ellipsizeMode='tail'
		>{props.value}</Text>
	</View>
);


class EditableField extends Component {
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
				/>
				{deleteAllowed &&
					<TouchableIcon
						style={styles.fieldEditIcon}
						color={brightBlue}
						size={20} name='trash-o'
						onPress={this.onDelete}/>
				}
			</View>
		);
	}
}

const profilePictureSize= DEVICE_WIDTH / 2.5;

class CardContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card: this.props.Card.byId()[this.props.id]
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
		const id = this.props.id;
		Card.put(id, this.state.card);
		this.cancelEdit();
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
	render() {
		const {readOnly, editMode, keyboardOpen} = this.props;
		const card = editMode ? this.state.card : this.props.Card.byId()[this.props.id];
		const Field = editMode ? EditableField : ReadOnlyField;
		const {
			profilePhoto,
			displayPhoto,
			displayName,
			fields
		} = card;
		return (
			<View style={[styles.cardContainer, {marginBottom: editMode ? 0 : FOOTER_HEIGHT}]}>
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
				{ !readOnly && !editMode &&
					<TouchableOpacity	onPress={this.enableEdit}>
						<View style={styles.editButton}>
							<Icon style={styles.fieldEditIcon} color={brightBlue} size={20} name='pencil'/>
							<Text style={styles.fieldEditText} >Edit</Text>
						</View>
					</TouchableOpacity>
				}
				<ProfilePicture
					size={profilePictureSize}
					uri={profilePhoto}
					style={styles.profilePicture}
				/>
				<Field
					style={styles.displayName}
					textStyle={{fontSize: 24}}
					value={displayName}
					onChange={(v) => this.onChangeProp('displayName', v)}
				/>
				<ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
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
		position: 'relative',
		justifyContent: 'flex-end',
		right: 0,
		flexDirection: 'row',
		paddingTop: 10,
		paddingRight: 15,
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
	fieldEditIcon: {
		paddingRight: 2,
		backgroundColor: paleBlue,
	},
	fieldEditText: {
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
	}
});

export default ConnectToModel(WithKeyboard(CardContainer), Card);
