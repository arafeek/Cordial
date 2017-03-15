import * as types from '../consts/actions';
import DeviceStorage from '../storage';
import { DEVICE_SETTINGS_KEY } from '../consts/strings';

export function toggleSetting(key) {
  return {
    type: types.TOGGLE_SETTING,
    key
  };
}
