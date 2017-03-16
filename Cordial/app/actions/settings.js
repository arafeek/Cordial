import * as types from '../consts/actions';
import DeviceStorage from '../storage';
import { DEVICE_SETTINGS_KEY } from '../consts/strings';

export function toggleSetting(key) {
	return function(dispatch, getState) {
		dispatch({
			type: types.TOGGLE_SETTING,
			key
		});
		saveSettingsToStorage()(dispatch, getState);
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
