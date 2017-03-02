import React from 'react';
import {Keyboard} from 'react-native';

export default function withKeyboard(Component) {

  return class WithKeyboard extends React.Component {
    constructor(props) {
      super(props);
      this.state = {keyboardOpen: false};
    }
    componentWillMount () {
      this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
      this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
    }
    componentWillUnmount () {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
    _keyboardDidShow () {
      this.setState({keyboardOpen: true});
    }
    _keyboardDidHide () {
      this.setState({keyboardOpen: false});
    }
    render() {
      return <Component {...this.props} keyboardOpen={this.state.keyboardOpen}/>;
    }
  };
}
