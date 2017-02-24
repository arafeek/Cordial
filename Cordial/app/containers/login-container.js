import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as authActions from '../actions/auth';
import * as baseStyles from '../consts/styles';
import RegisterForm from '../components/register-form';


class LoginContainer extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { state, actions } = this.props;
    return (
      <View style={styles.container}>
        <Button onPress={Actions.welcome}
          title="register account" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: baseStyles.paleBlue,
  }
})


export default connect(
  state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(LoginContainer);

