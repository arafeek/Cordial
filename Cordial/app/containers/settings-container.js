import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Button,
} from 'react-native';

import * as authActions from '../actions/auth';
import * as settingsActions from '../actions/settings';
import SettingsItem from '../components/settings-button';
import { HEADER_HEIGHT } from '../consts/styles';

class SettingsContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: HEADER_HEIGHT}}>
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
        <Button onPress={actions.logout}
          title="Logout"
          color="red" />
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
