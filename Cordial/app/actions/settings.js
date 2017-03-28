import * as types from '../consts/actions';
import DeviceStorage from '../storage';
import { DEVICE_SETTINGS_KEY } from '../consts/strings';
import Contacts from 'react-native-contacts';
import getUUID from 'uuid-by-string';
import {Card} from '../models/Model';

function deduceSettingsPermissions(getState, key){
	if(key=='autoExportToDevice'){
		return getState().settings.autoExportToDevice.value;
	}else if (key =='useCompactProfileView') {
		return getState().settings.useCompactProfileView.value;
	}
}

function findNameInNativeContacts(displayName, nativeContactsList){
	
	const nativeContactsLength = Object.keys(nativeContactsList).length;
	
	for(var i = 0; i < nativeContactsLength; i++){
		//console.log('COMPARING: ' + nativeContactsList[i].givenName + ' ' + displayName);
		if(nativeContactsList[i].givenName == displayName){
			//console.log('	FOUND: ' + nativeContactsList[i].givenName + ' at index: ' + i);
			return i;
		}
	}
	return -1;
}

function convertJSONToContactsAndAdd(allContactsList){

	var contactsList = Object.values(allContactsList);
	const contactsLength = Object.keys(allContactsList).length;

	Contacts.getAll((err, allNativeContacts) => {
			var nativeContactsList = Object.values(allNativeContacts);
			
			for(var i = 0; i < contactsLength; i++){
				var indexValue = findNameInNativeContacts(contactsList[i].displayName, nativeContactsList);
				if(indexValue >= 0){
					var updatefieldsList = Object.values(contactsList[i].fields);
					const updatefieldsLength = Object.keys(updatefieldsList).length;

					for(var j = 0; j < updatefieldsLength; j++){
						// nativeContactsList.givenName =  contactsList[i].displayName;
						// delete nativeContactsList.givenName;

						if(updatefieldsList[j].displayName === 'Email'){
							var tempu = {};
							tempu['label'] = 'home';
							tempu['email'] = updatefieldsList[j].value;
							nativeContactsList[indexValue].emailAddresses.push(tempu);
						}else if(updatefieldsList[j].displayName === 'Phone'){
							var tempu2 = {};
							tempu2['label'] = 'work';
							tempu2['number'] = updatefieldsList[j].value;
							nativeContactsList[indexValue].phoneNumbers.push(tempu2);
						
						}
					}
					Contacts.updateContact(nativeContactsList[indexValue], (err) => { /*...*/ });
				}else{
					var data = {
					recordID: getUUID(contactsList[i].id),
					givenName: contactsList[i].displayName,
					emailAddresses: [],
					phoneNumbers: [],

					};
					var fieldsList = Object.values(contactsList[i].fields);
					const fieldsLength = Object.keys(fieldsList).length;
					for(var k = 0; k < fieldsLength; k++){
						
						if(fieldsList[k].displayName === 'Email'){
							var temp = {};
							temp['label'] = 'home';
							temp['email'] = fieldsList[k].value;
							data.emailAddresses.push(temp);
						}else if(fieldsList[k].displayName === 'Phone'){
							var temp2 = {};
							temp2['label'] = 'work';
							temp2['number'] = fieldsList[k].value;
							data.phoneNumbers.push(temp2);
						} 
					}
					Contacts.addContact(data, (err) => { });
				}
				
			}	

		alert('All Contacts Synced!');
	});
}

export function exportCardsToPhone(getState, key) {
	//validat the setting based on the getState paramter
	if(deduceSettingsPermissions(getState, key) == true){
		var allContactsList = Card.myContacts();
		convertJSONToContactsAndAdd(allContactsList);
	}else{
		alert('Permission For Contacts Access Turned Off. Update Settings.');
	}

}


export function toggleSetting(key) {
	return function(dispatch, getState) {
		dispatch({
			type: types.TOGGLE_SETTING,
			key
		});
		saveSettingsToStorage()(dispatch, getState);
		if(key=='autoExportToDevice'){
				exportCardsToPhone(getState, key);
		}
	};
}

export function loadSettingsFromStorage() {
	return function(dispatch) {
		dispatch({type: types.LOAD_SETTINGS_PENDING});
		DeviceStorage.load({key: DEVICE_SETTINGS_KEY})
		.then(settings => {
			dispatch({
				type: types.LOAD_SETTINGS_SUCCESS,
				settings
			});
		})
		.catch(() => dispatch({type: types.LOAD_SETTINGS_FAILURE}));
	};
}

export function saveSettingsToStorage() {
	return function(dispatch, getState) {
		dispatch({type: types.SAVE_SETTINGS_PENDING});
		DeviceStorage.save({
			key: DEVICE_SETTINGS_KEY,
			rawData: getState().settings
		})
		.then(() => dispatch({type: types.SAVE_SETTINGS_SUCCESS}))
		.catch(() => dispatch({type: types.SAVE_SETTINGS_FAILURE}));
	};
}
