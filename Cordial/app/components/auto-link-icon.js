import React from 'react';
import Autolinker from 'autolinker';
import { Linking } from 'react-native';

import TouchableIcon from './touchable-icon';
import { sanitizePhoneNumber } from '../utils/utils';

export default class AutolinkIcon extends React.Component {
	constructor(props) {
		super(props);
		this.onPress = this.onPress.bind(this);
	}
	onPress() {
		const matches = this.getMatches(this.props.value);
		if (matches.length > 0) {
			const link = this.getUrl(matches[0]);
			Linking.openURL(link);
		} else {
			this.props.noLinkOnPress();
		}
	}

	getMatches(text) {
		const matches = [];
    // TODO: This could be bad, but really what else looks like a phone number?
    let sample = sanitizePhoneNumber(text); // should only affect poorly formatted phone numbers
		try {
			Autolinker.link(sample || '', {
				email: true,
				phone: true,
				urls: true,
				replaceFn: (match) => {
					const token = match.getMatchedText();
					matches.push(match);
					return token;
				},
			});
		} catch (e) {
			return null;
		}
		return matches;
	}
	getUrl(match) {
		const type = match.getType();
		switch (type) {
			case 'email': {
				return `mailto:${encodeURIComponent(match.getEmail())}`;
			}
			case 'phone': {
				const number = match.getNumber();
				return `tel:${number}`;
			}
			case 'url': {
				return match.getAnchorHref();
			}
			default: {
				return match.getMatchedText();
			}
		}
	}
	render() {
		const {size, name, style} = this.props;
		return <TouchableIcon size={size} name={name} style={style} onPress={this.onPress}/>;
	}
}
