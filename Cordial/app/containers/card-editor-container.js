import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import {Card} from '../models/Model';
import CardContainer from '../containers/card-container';

class CardEditorContainer extends Component {
  render() {
    const id = this.props.navigationState.data;
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <CardContainer readOnly={false} editMode id={id}/>
      </View>
    );
  }
}

export default connect()(CardEditorContainer);
