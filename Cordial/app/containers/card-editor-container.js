import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import _ from 'lodash';

import {Card} from '../models/Model';
import CardContainer from '../containers/card-container';

class CardEditorContainer extends Component {
  render() {
    // TODO: This assumes user only has one card
    const cards = Card.myCards();
    return (
      <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
        <CardContainer readOnly={false} editMode id={_.sample(cards).id}/>
      </View>
    );
  }
}

export default connect()(CardEditorContainer);
