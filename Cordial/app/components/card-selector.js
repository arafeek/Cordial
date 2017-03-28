import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import _ from 'lodash';

import {Card} from '../models/Model';

import {paleBlue, lightBlue, brightBlue} from '../consts/styles';

class CardOption extends Component {
  render() {
    return(
      <TouchableOpacity
        style={[styles.cardOption, this.props.style]}
        onPress={this.props.onPress}
      >
        <Text style={styles.cardText}>{this.props.value}</Text>
      </TouchableOpacity>
    );
  }
}

export default class CardSelector extends Component {
	render() {
    const cards = Card.myCards();
    const card = _.sample(cards);

    return(
      <View style={styles.cardSelector}>
      {
        _.map(cards, (card, key) =>
          <CardOption
            style={{backgroundColor: (card.id === this.props.currentCard) ? lightBlue : paleBlue}}
            value={card.type}
            id={card.id}
            key={key}
            onPress={() => this.props.selectCard(card.id)}
          />
        )
      }
      <CardOption
        value='Create Card'
        onPress={() => this.props.createCard(card.displayName, card.fields[0].value, card.fields[1].value)}
      />
      <CardOption
        style={{borderBottomWidth: 0}}
        value='Cancel'
        onPress={this.props.closeTray}
      />
      </View>
    );
	}
}

const styles = StyleSheet.create({
  cardSelector: {
    flexDirection: 'column',
    position: 'absolute',
    ...Platform.select({ios: {zIndex: 3}, android: {elevation: 3}}),
    borderWidth: 1,
    borderRadius: 8,
    borderColor: brightBlue,
    backgroundColor: paleBlue,
    width: 100,
    top: 20,
    left: 10,
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  cardOption: {
    height: 35,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: brightBlue,
  },
  cardText: {
    fontSize: 12,
    alignSelf: 'center'
  }
});
