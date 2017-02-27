import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInput
} from 'react-native';
import React, {Component} from 'react';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

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
						size={16} name='trash'
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
		const {readOnly, editMode} = this.props;
		const card = editMode ? this.state.card : this.props.Card.byId()[this.props.id];
		const Field = editMode ? EditableField : ReadOnlyField;
		const {
			profilePhoto,
			displayPhoto,
			displayName,
			fields
		} = card;
		return (
			<View style={styles.cardContainer}>
				<DisplayPicture style={styles.displayPicture} uri={displayPhoto}/>
				<View style={styles.displayPictureBorder}/>
				<ProfilePicture
					size={profilePictureSize}
					uri={profilePhoto}
					style={styles.profilePicture}
				/>
				{ !readOnly && !editMode &&
					<TouchableOpacity	onPress={this.enableEdit}>
						<View style={styles.editButton}>
							<Icon style={styles.fieldEditIcon} size={16} name='pencil'/>
							<Text>Edit</Text>
						</View>
					</TouchableOpacity>
				}
				<Field
					style={styles.displayName}
					textStyle={{fontSize: 18}}
					value={displayName}
					onChange={(v) => this.onChangeProp('displayName', v)}
				/>
				<View style={styles.fieldGrid}>
					<View style={styles.fieldKeys}>
						{
							_.map(fields, (f, key) => <Text style={[styles.fieldText, styles.field]} key={key}>{f.displayName + ':'}</Text>)
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
					<TouchableOpacity	onPress={this.openFieldPicker}>
						<Text style={styles.addMore}>Add More</Text>
					</TouchableOpacity>
				}
				{ editMode &&
				<View style={styles.editTray}>
					<TileButton style={styles.submitButton} onPress={this.submitEdit}>
						<Text >Save</Text>
					</TileButton>
					<TileButton style={styles.submitButton} onPress={this.cancelEdit}>
						<Text >Cancel</Text>
					</TileButton>
				</View>
				}
			</View>
		);

	}
}

const styles = StyleSheet.create({
	cardContainer: {
		justifyContent: 'flex-start',
		backgroundColor: paleBlue,
		flex: 1
	},
	editButton: {
		position: 'relative',
		alignSelf: 'flex-end',
		flexDirection: 'row',
		padding: 5,
		zIndex: 1000,
	},
	profilePicture: {
		alignSelf: 'center',
		position: 'relative',
		top: profilePictureSize / -2
	},
	displayName: {
		alignSelf: 'center',
		marginTop: profilePictureSize / -2,
		paddingHorizontal: 5,
		flexDirection: 'row',
	},
	displayPictureBorder: { // I am sorry for these hax
		borderWidth: 2, // borderBottomWidth doesn't seem to work
		borderColor: brightBlue,
	},
	fieldGrid: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		paddingHorizontal: 10
	},
	fieldKeys: {
		flex: 0
	},
	fieldValues: {
		flex: 1
	},
	field: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 4
	},
	fieldEditIcon: {
		paddingRight: 5,
		backgroundColor: paleBlue,
	},
	fieldText: {
		fontSize: 16,
		flex: 1
	},
	textField: {
		backgroundColor: white,
		fontSize: 14,
		height: 20,
		margin: 4,
		paddingVertical: 2,
		paddingHorizontal: 8,
		textDecorationLine: 'none',
		borderColor: lightBlue,
		borderWidth: 1,
		flex: 1
	},
	editTray: {
		flexDirection: 'row',
		flex: 0,
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: FOOTER_HEIGHT,
		alignItems: 'center',
	},
	submitButton: {
		borderWidth: 1,
		borderColor: brightBlue,
	},
	addMore: {
		flex: 0,
		borderWidth: 1,
		borderColor: brightBlue,
		backgroundColor: lightBlue
	}
});

export default ConnectToModel(CardContainer, Card);
