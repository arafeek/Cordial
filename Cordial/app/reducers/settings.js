import * as actions from '../consts/actions';

const initialState = {
	useCompactProfileView: {
		value: false,
		description: 'Enable compact profile view'
	},
	autoExportToDevice: {
		value: false,
		description: 'Export cards to device contacts automatically'
	}
};

export default function SettingsReducer(state = initialState, action = {}) {
	switch (action.type) {
		case actions.TOGGLE_SETTING: {
		console.log(action);
			const {key} = action;
			return {
				...state,
				[key]: {...state[key], value: !state[key].value}
			};
		}
		case actions.LOAD_SETTINGS_SUCCESS: {
			const {settings} = action;
			return {...state, ...settings};
		}
		default:
			return state;
	}
}
