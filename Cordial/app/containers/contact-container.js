import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

import CardContainer from '../containers/card-container';

class ContactContainer extends Component {
  render() {
    // TODO: This assumes user only has one card
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <CardContainer readOnly={true} id={this.props.id}/>
      </View>
    );
  }
}

export default connect()(ContactContainer);
