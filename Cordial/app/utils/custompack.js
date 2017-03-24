import _ from 'lodash';
import jsonpack from 'jsonpack';

import Icons from '../consts/icons';


function intToBase64(n) {
	return String.fromCharCode(48 + n);
}

function mapToIndicesBase64(arr) {
	return _.reduce(arr, (acc, str, index) => ({...acc, [str]: intToBase64(index)}), {});
}

const knownKeys = [
	'displayName',
	'displayPhoto',
	'fields',
	'profilePhoto',
	'custom',
	'value',
	'id'
];

const knownValues = [...Object.keys(Icons), ..._.map(Icons, 'displayName')];

const excludedKeys = [
	'type',
	'style',
	'user'
];

const keyMapping = mapToIndicesBase64(knownKeys);
const valueMapping = mapToIndicesBase64(knownValues);
const keyUnmapping = _.invert(keyMapping);
const valueUnmapping = _.invert(valueMapping);

function _pack(json) {
	if (_.isPlainObject(json)) {
		return _(json)
			.mapValues(_pack)
			.mapKeys((v, key) => keyMapping[key] || key)
			.pickBy((v, k) => !_.includes(excludedKeys, k))
			.value();
	} else if (_.isArray(json)) {
		return _.map(json, _pack);
	} else {
		return valueMapping[json] || json;
	}
}

function _unpack(json) {
	if (_.isPlainObject(json)) {
		return _(json)
			.mapValues(_unpack)
			.mapKeys((v, key) => keyUnmapping[key] || key)
			.value();
	} else if (_.isArray(json)) {
		return _.map(json, _unpack);
	} else {
		return valueUnmapping[json] || json;
	}
}

const custompack = {
	pack: function(json) {
		const packed = _pack(json);
		return jsonpack.pack(_pack(json));
	},
	unpack : function(data) {
		return _unpack(jsonpack.unpack(data));
	}
};

export default custompack;

