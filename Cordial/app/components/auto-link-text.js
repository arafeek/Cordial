import React, {Component} from 'react';
import Autolink from 'react-native-autolink';


export default class AutoLinkText extends Component {
	render() {
		const {style, numberOfLines, children} = this.props;
		return (
			<Autolink
				phone email
				linkStyle={ [{ color: '#2980b9'}, style] }
				style={style}
				text={children}
				numberOfLines={numberOfLines}
			/>
		);
	}
}
