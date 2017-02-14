import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';

class ContactsContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        This is the contacts page.
      </Text>
    </View>
    );
  }
}

export default connect()(ContactsContainer);
