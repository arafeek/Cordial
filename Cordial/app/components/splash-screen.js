import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import {User} from '../models/Model';

const SPLASH_TIME = 500;

const styles = StyleSheet.create({
	logo: {
		flexDirection: 'row',
		alignSelf: 'center',
		height: 70,
		width: 250,
	},
	screen: {
		flex: 1,
		justifyContent: 'center'
	}
});



export class Splash extends React.Component {
	render() {
		return (
			<View style={styles.screen}>
				<Image
					source={require('../assets/img/cordial.png')}
					style={styles.logo}
				/>
			</View>
		);
	}
}

export default class SplashScreen extends React.Component {
	componentDidMount() {
		const redirectOptions = {type: ActionConst.REPLACE};
		if (User.me()) {
			setTimeout(() => Actions.tabbar(redirectOptions), SPLASH_TIME);
		} else {
			setTimeout(() => Actions.welcome(redirectOptions), SPLASH_TIME);
		}
	}
	render() {
		return <Splash/>;
	}
}

