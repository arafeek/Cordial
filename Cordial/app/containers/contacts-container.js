import React, { Component } from 'react';
import { Text, View, ScrollView, Image, TouchableHighlight, Navigator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

import ProfilePicture from '../components/profile-picture';
import {Card} from '../models/Model';
import ConnectToModel from '../models/connect-to-model';
import {brightBlue, lightBlue} from '../consts/styles';

class Contact extends Component {
  render() {
    const {displayName, profilePhoto, displayPhoto, style} = this.props;

    if (displayPhoto) {
      return <View/>; // TODO: make this work
    } else {
      const colors = [style.header.startColor, style.header.endColor];
      return (
        <TouchableHighlight style={{
          flex: 0,
          height: 150,
        }}>
          <LinearGradient
            style={{
              height: 150,
              flex: 1,
            }}
            colors={colors}
          >
            <Text
              style={{
                flex: 1,
                alignSelf: 'flex-start',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: brightBlue,
                backgroundColor: lightBlue,
                left: 5,
                bottom: 5,
                position: 'absolute',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 5,
                paddingBottom: 5,
              }}
            >
              {displayName}
            </Text>

            <ProfilePicture
              size={100}
              imgID={profilePhoto}
              style={{
                alignSelf: 'flex-end',
                right: 5,
                bottom: 5,
                position: 'absolute',
              }}/>
          </LinearGradient>
        </TouchableHighlight>
      );
    }
  }
}

class ContactsContainer extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight,
        paddingBottom: Navigator.NavigationBar.Styles.General.TotalNavHeight
      }}
      >
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            justifyContent: 'flex-start',
          }}
        >
          {
            _.map(this.props.Card, (card, key) => <Contact key={key} {...card}/>)
          }
        </ScrollView>
      </View>
    );
  }
}

export default ConnectToModel(ContactsContainer,Card);
