import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import * as authActions from '../actions/auth';
import * as settingsActions from '../actions/settings';
import SettingsItem from '../components/settings-button';
import { HEADER_HEIGHT } from '../consts/styles';

class SettingsContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingTop: HEADER_HEIGHT}}>
        {
          _.map(state.settings, ({value, description}, key) => (
            <SettingsItem
              key={key}
              onPress={() => actions.toggleSetting(key)}
              text={description}
              value={value}
            />
          ))
        }
        <TouchableOpacity
          style={{padding: 10, alignSelf: 'center'}}
          onPress={actions.logout}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  state => ({
    state: {
      auth: state.auth,
      settings: state.settings
    }
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      ...authActions,
      ...settingsActions
    }, dispatch)
  })
)(SettingsContainer);
