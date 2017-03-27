import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import _ from 'lodash';

import {Card} from '../models/Model';

import {lightBlue, brightBlue} from '../consts/styles';

class CardOption extends Component {
  render() {
    return(
      <View style={styles.cardOption}>
        <Text style={styles.cardText}>{this.props.value}</Text>
      </View>
    );
  }
}

export default class CardSelector extends Component {
	render() {
    const cards = Card.myCards();

    return(
      <View style={styles.cardSelector}>
      {
        _.map(cards, (card) =>
          <CardOption
            value={card.type}
            id={card.id}
          />
        )
      }
      </View>
    );
	}
}

const styles = StyleSheet.create({
  cardSelector: {
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 3,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: brightBlue,
    backgroundColor: lightBlue,
    width: 100,
    top: 20,
    left: 10,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardOption: {
    height: 35,
    justifyContent: 'space-around'
  },
  cardText: {
    fontSize: 12,
    alignSelf: 'center'
  }
});
