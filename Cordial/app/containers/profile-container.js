import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View
} from 'react-native';
import _ from 'lodash';

import IconList from '../consts/icons';
import TouchableIcon, {Icon} from '../components/touchable-icon';

class ProfileContainer extends Component {
  render() {
    const { state, actions } = this.props;
    return (
      <View style={{flex: 0, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <Text>
          This is the profile page.
        </Text>
        {
          _.map(Object.keys(IconList), i => <TouchableIcon key={i} name={i} size={40} style={{flex: 0, margin: 4}}/>)
        }
      </View>
    );
  }
}

export default connect()(ProfileContainer);
