import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
} from 'react-native';

class ContactsContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <Text>
        This is the contacts page.
      </Text>
    );
  }
}

export default connect()(ContactsContainer);
