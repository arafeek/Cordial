import React from 'react';
import {
  Actions,
  Scene,
  TabBar,
} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import { TabIcon } from '../components/tab-icon';
import ProfileContainer from '../containers/profile-container';
import ContactsContainer from '../containers/contacts-container';
import SettingsContainer from '../containers/settings-container';
import { FOOTER_HEIGHT } from '../consts/styles';


const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0.5,
    borderColor: '#b7b7b7',
    backgroundColor: 'white',
    opacity: 1,
    height: FOOTER_HEIGHT
  }
});
const routes = Actions.create(
  <Scene key="root">
    <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar}>
      <Scene
        key="profile"
        icon={TabIcon}
        component={ProfileContainer}
        title="Profile"
        hideNavBar={true} />
      <Scene
        key="contacts"
        icon={TabIcon}
        component={ContactsContainer}
        title="Contacts"
        hideNavBar={true} />
      <Scene
        key="settings"
        icon={TabIcon}
        component={SettingsContainer}
        title="Settings" />
    </Scene>
  </Scene>
);

export default routes;
