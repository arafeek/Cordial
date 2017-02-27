import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  Platform,
  StatusBar
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import StatusBarBackground from '../components/statusbar-background';

import * as authActions from '../actions/auth';
import * as baseStyles from '../consts/styles';
import RegisterForm from '../components/register-form';

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
    this._isLoggedIn();
  }

  _isLoggedIn() {
    // TODO: check for token in local storage
    const { state } = this.props;
    if (state.user.id) {
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
        { Platform.OS === 'ios' ?
          <StatusBarBackground />
        :
          <StatusBar
            backgroundColor={baseStyles.brightBlue}
          />
        }

        <View style={styles.logoContainer}>
          <Text style={styles.welcomeText}>
            Welcome to
          </Text>
          <Image source={require('../assets/img/cordial.png')}
            style={styles.logo} />
        </View>
        <RegisterForm onSubmit={actions.registerUser}/>
        <Text style={styles.existingAccount}
          onPress={Actions.login} >
          Already have an account?
        </Text>
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
    maxHeight: 250
  },
  welcomeText: {
    alignSelf: 'flex-start',
    fontSize: 18
  },
  existingAccount: {
    paddingTop: 10,
    fontSize: 18,
    alignSelf: 'center'
  }
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

