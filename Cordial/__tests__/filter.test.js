import filter from '../app/utils/filter';

describe('filter/search', () => {

	const obj1 = {
		foo: 'bar',
		test: 'yes',
		baz: 'buzz'
	};
	const obj2 = {
		notAString: 1234,
		someNested: ['lol', 'test'],
		foo: 'barf'
	};
	const obj3 = {
		someString: 'asdf',
		test: '12345556756'
	};

	const data = [obj1, obj2, obj3];

	it('Does strict search', () => {
		expect(filter(data, 'bar')).toEqual([obj1, obj2]);
		expect(filter(data, 'a')).toEqual(data);
		expect(filter(data, 'orange')).toEqual([]);
		expect(filter(data, '1234')).toEqual([obj3]);
		expect(filter(data, '')).toEqual(data);
	});

	it('Does hamming search', () => {
		expect(filter(data, '', {useHamming: true, hammingThreshold: 0})).toEqual(filter(data, ''));
		expect(filter(data, 'bar', {useHamming: true, hammingThreshold: 0})).toEqual(filter(data, 'bar'));
	});

});
