import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as authActions from '../actions/auth';
import * as baseStyles from '../consts/styles';
import RegisterForm from '../components/register-form';

import {User} from '../models/Model';

// Welcome container is the first route visited regardless
// As such, it should re route the user if they are already logged in
class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this._isLoggedIn();
  }

  componentDidUpdate() {
    // This causes problems for non-tabbar routes
    //this._isLoggedIn();
  }

  _isLoggedIn() {
    // TODO: check for token in local storage
    const { state } = this.props;
    if (User.me()) {
      // go to profile page
      Actions.tabbar();
    }
  }

  render() {
    const { state, actions } = this.props;
    if (state.auth.loading) {
      return <Text> Loading ... </Text>
    }
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/img/cordial.png')}
            style={styles.logo} />
        </View>
        <RegisterForm onSubmit={actions.registerUser}/>
        <Button onPress={Actions.login}
          title="Already have an account?" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: baseStyles.paleBlue,
  },
  logo: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 70,
    width: 250,
  },
  logoContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})


export default connect(
  state => ({
    state: {
      user: state.model.User,
      auth: state.auth,
    }
  }),
  (dispatch) => ({
    actions: bindActionCreators(authActions, dispatch)
  })
)(WelcomeContainer);

