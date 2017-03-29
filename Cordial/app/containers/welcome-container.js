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
import * as modelActions from '../actions/model';
import * as settingsActions from '../actions/settings';
import * as baseStyles from '../consts/styles';
import {
  DEVICE_USER_KEY,
  DEVICE_USER_ID
} from '../consts/strings';
import RegisterForm from '../components/register-form';
import { Splash } from '../components/splash-screen';

import {User} from '../models/Model';

// Welcome container is the first route visited regardless
// As such, it should re route the user if they are already logged in
class WelcomeContainer extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.loadModelFromStorage(DEVICE_USER_KEY, DEVICE_USER_ID);
    this.props.actions.loadSettingsFromStorage();
    this._isLoggedIn();
  }

  componentDidUpdate() {
    //This causes problems for non-tabbar routes
    this._isLoggedIn();
  }

  _isLoggedIn() {
    // TODO: check for token in local storage
    const { state } = this.props;
    if (User.me()) {
      Actions.tabbar();
    }
  }

  render() {
    const { state, actions } = this.props;
    if (state.auth.loading && !User.me()) {
      return <Splash/>;
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
    actions: bindActionCreators({
      ...authActions,
      ...modelActions,
      ...settingsActions
    }, dispatch)
  })
)(WelcomeContainer);

