const { describe, it } = require('mocha');
const { assert } = require('chai');

const { handler } = require('./index');

describe('Basic output', async () => {
	const { statusCode, body } = await handler();
	it('Should return string in body', () => {
		// If you're using async and some slow operations
		// this.timeout = 20000;
		assert.isString(body);
	});
	it('Should return statusCode in response', () => {
		assert.isNumber(statusCode);
	});
});
