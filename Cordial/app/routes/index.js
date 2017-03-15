import React from 'react';
import {
  Actions,
  Scene,
  ActionConst
} from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import { TabIcon } from '../components/tab-icon';
import ProfileContainer from '../containers/profile-container';
import ContactsContainer from '../containers/contacts-container';
import ContactContainer from '../containers/contact-container';
import SettingsContainer from '../containers/settings-container';
import QRCodeContainer from '../containers/qrcode-container';
import QRCodeScannerContainer from '../containers/qrcode-scanner-container';
import WelcomeContainer from '../containers/welcome-container';
import LoginContainer from '../containers/login-container';
import CardEditorContainer from '../containers/card-editor-container';
import FieldPicker from '../containers/field-picker';
import { FOOTER_HEIGHT, paleBlue, brightBlue } from '../consts/styles';

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderColor: brightBlue,
    backgroundColor: paleBlue,
    opacity: 1,
    height: FOOTER_HEIGHT
  }
});
const routes = Actions.create(
  <Scene key="root">
    <Scene key="welcome"
      component={WelcomeContainer}
      title="Welcome"
      hideNavBar={true}
      initial={true} />
    <Scene key="login"
      component={LoginContainer}
      hideNavBar={true} />
    <Scene key="tabbar"
      tabs={true}
      tabBarStyle={styles.tabBar}
      type={ActionConst.REPLACE}>
      <Scene
        key="profile"
        icon={TabIcon}
        iconName="user"
        title="User"
        component={ProfileContainer}
        hideNavBar={true} />
      <Scene
        key="contacts"
        icon={TabIcon}
        iconName="address-book-o"
        title="Contacts"
        component={ContactsContainer}
        hideNavBar={true} />
      <Scene
        key="settings"
        icon={TabIcon}
        iconName="cog"
        component={SettingsContainer}
        title="Settings"/>
    </Scene>
    <Scene
      key="cardeditor"
      component={CardEditorContainer}
      title="Card Editor"
      hideNavBar={true}/>
    <Scene
      key="contact"
      component={ContactContainer}
      title="Contact View"
      hideNavBar={false}
      direction="vertical" />
    <Scene
      key="fieldpicker"
      component={FieldPicker}
      title="Choose a field type"
      hideNavBar={false}
      direction="vertical" />
    <Scene
      key="qrcode"
      component={QRCodeContainer}
      title="QR Code"
      hideNavBar={true} />
    <Scene
        key="qrcodescanner"
        component={QRCodeScannerContainer}
        title="QR Code Scanner"/>
  </Scene>
);

export default routes;
