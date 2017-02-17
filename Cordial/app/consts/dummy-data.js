// dummy data

export const JohnDoeCard1 = {
	id: 'JOHNDOE_1',
	user: 'JOHNDOE',
	displayName: 'John A. Doe',
	type: 'Business',
	profilePhoto: null,
	displayPhoto: 'someID',
	style: {
		header: {
			startColor: '#ffffff',
			endColor: '#888888'
		},
		body: {
			startColor: '#beef1e',
			endColor: '#ffffff'
		}
	},
	fields: [
		{
			custom: false,
			value: 'www.web.site',
			displayName: 'Website',
			icon: 'website'
		}
	]
};

export const LinusTorvaldsCard1 = {
	id: 'LINUS_1',
	user: 'LINUS',
	displayName: 'Linus Torvalds',
	type: 'Business',
	profilePhoto: null,
	displayPhoto: null,
	style: {
		header: {
			startColor: '#ff0000',
			endColor: '#888800'
		},
		body: {
			startColor: '#beef1e',
			endColor: '#ffffff'
		}
	},
	fields: [
		{
			custom: false,
			value: 'https://github.com/torvalds',
			displayName: 'Github',
			icon: 'github'
		},
		{
			custom: false,
			value: 'https://twitter.com/Linus__Torvalds',
			displayName: 'Twitter',
			icon: 'twitter'
		}
	]
};

export const TinusLorvaldsCard1 = {
	id: 'TINUS_1',
	user: 'TINUS',
	displayName: 'Tinus Lorvalds',
	type: 'Business',
	profilePhoto: null,
	displayPhoto: null,
	style: {
		header: {
			startColor: '#00ff00',
			endColor: '#0000ff'
		},
		body: {
			startColor: '#beef1e',
			endColor: '#ffffff'
		}
	},
	fields: [
		{
			custom: false,
			value: 'https://github.com/torvalds',
			displayName: 'Github',
			icon: 'github'
		},
		{
			custom: false,
			value: 'https://twitter.com/Linus__Torvalds',
			displayName: 'Twitter',
			icon: 'twitter'
		}
	]
};

export const CharlieCard1 = {
	id: 'CHARLIE_1',
	user: 'CHARLIE',
	displayName: 'Charlie Kelly',
	type: 'Business',
	profilePhoto: null,
	displayPhoto: null,
	style: {
		header: {
			startColor: '#000000',
			endColor: '#abcdef'
		},
		body: {
			startColor: '#beef1e',
			endColor: '#ffffff'
		}
	},
	fields: []
};

export const DennisCard1 = {
	id: 'DENNIS_1',
	user: 'DENNIS',
	displayName: 'Dennis Reynolds',
	type: 'Personal',
	profilePhoto: null,
	displayPhoto: null,
	style: {
		header: {
			startColor: '#ffffff',
			endColor: '#abcdef'
		},
		body: {
			startColor: '#beef1e',
			endColor: '#ffffff'
		}
	},
	fields: []
};

export const cards = [JohnDoeCard1, LinusTorvaldsCard1, TinusLorvaldsCard1, CharlieCard1, DennisCard1];

export const JohnDoeProfile = {
	id: 'JOHNDOE',
	email: 'johndoe@cogeco.net',
	phone: '1-800-867-5309',
	cards: ['JOHNDOE_1'],
	ignoredContacts: [],
	contacts: [JohnDoeCard1.id, CharlieCard1.id, DennisCard1.id, LinusTorvaldsCard1.id],
	pendingContacts: [TinusLorvaldsCard1.id]
};
