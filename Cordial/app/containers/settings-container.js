import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';

import * as authActions from '../actions/auth';
import SettingsItem from '../components/settings-button';

class SettingsContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 100}}>
        <Text>
          This is the settings page.
        </Text>
        <SettingsItem onPress={actions.logout}
          content={<Text>Logout</Text>} />
      </View>
    );
  }
}

export default connect(
  state => ({
    state: {
      auth: state.auth,
    }
  }),
  (dispatch) => ({
    actions: bindActionCreators({
      ...authActions,
    }, dispatch)
  })
)(SettingsContainer);
