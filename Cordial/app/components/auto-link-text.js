import React, {Component} from 'react';
import Autolink from 'react-native-autolink';
import { sanitizePhoneNumber } from '../utils/utils';

export default class AutoLinkText extends Component {
	render() {
		const {style, numberOfLines, children = ''} = this.props;
    const sanitized = sanitizePhoneNumber(children);
		return (
			<Autolink
				phone email
				linkStyle={ [{ color: '#2980b9'}, style] }
				style={style}
				text={sanitized}
				numberOfLines={numberOfLines}
			/>
		);
	}
}
