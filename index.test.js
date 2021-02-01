const { describe, it } = require('mocha');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const db = require('mysql2-promise')();

const { assert } = chai;
const { handler } = require('./index');
const { expect } = require('chai');

chai.use(chaiAsPromised);

const exampleInput = {
	"resource": "/registerZoomUser",
	"path": "/registerZoomUser",
	"httpMethod": "POST",
	"headers": {
		"accept": "*/*",
		"content-type": "application/x-www-form-urlencoded",
		"Host": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"Authorization": process.env.ZOOM_VERIFICATION_TOKEN,
		"User-Agent": "curl/7.69.1",
		"X-Amzn-Trace-Id": "Root=1-5ff62e24-76095b9f512d1ba418679265",
		"x-api-key": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
		"X-Forwarded-For": "189.203.45.5",
		"X-Forwarded-Port": "443",
		"X-Forwarded-Proto": "https"
	},
	"multiValueHeaders": {
		"accept": [
			"*/*"
		],
		"content-type": [
			"application/x-www-form-urlencoded"
		],
		"Host": [
			"k69og1xocl.execute-api.us-west-2.amazonaws.com"
		],
		"Authorization": [
			process.env.ZOOM_VERIFICATION_TOKEN
		],
		"User-Agent": [
			"curl/7.69.1"
		],
		"X-Amzn-Trace-Id": [
			"Root=1-5ff62e24-76095b9f512d1ba418679265"
		],
		"X-Forwarded-For": [
			"189.203.45.5"
		],
		"X-Forwarded-Port": [
			"443"
		],
		"X-Forwarded-Proto": [
			"https"
		]
	},
	"queryStringParameters": null,
	"multiValueQueryStringParameters": null,
	"pathParameters": null,
	"stageVariables": null,
	"requestContext": {
		"resourceId": "n7kinm",
		"resourcePath": "/registerZoomUser",
		"httpMethod": "POST",
		"extendedRequestId": "YvwlqGu_vHcF5lw=",
		"requestTime": "06/Jan/2021:21:39:48 +0000",
		"path": "/default/registerZoomUser",
		"accountId": "746240737045",
		"protocol": "HTTP/1.1",
		"stage": "default",
		"domainPrefix": "k69og1xocl",
		"requestTimeEpoch": 1609969188120,
		"requestId": "82fc8ffe-4d80-4648-99fb-eb77571eca29",
		"identity": {
			"cognitoIdentityPoolId": null,
			"cognitoIdentityId": null,
			"apiKey": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
			"principalOrgId": null,
			"cognitoAuthenticationType": null,
			"userArn": null,
			"apiKeyId": "csfd99zbnd",
			"userAgent": "curl/7.69.1",
			"accountId": null,
			"caller": null,
			"sourceIp": "189.203.45.5",
			"accessKey": null,
			"cognitoAuthenticationProvider": null,
			"user": null
		},
		"domainName": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"apiId": "k69og1xocl"
	},
	"body": `{
	"event": "webinar.participant_joined",
	"event_ts": 1234566789900,
	"payload": {
		"account_id": "o8KK_AAACq6BBEyA70CA",
		"operator": "emiliocanton@nuclea.solutions",
		"object": {
			"uuid": "czLF6FFFoQOKgAB99DlDb9g==",
			"id": "${process.env.ZOOM_ID}",
			"host_id": "uLoRgfbbTayCX6r2Q_qQsQ",
			"topic": "My Meeting",
			"type": 2,
			"start_time": "2021-02-11T07:00:00Z",
			"duration": 60,
			"timezone": "America/Los_Angeles",
			"participant": {
				"user_id": "16782040",
				"user_name": "shree",
				"id": "iFxeBPYun6SAiWUzBcEkX",
				"join_time": "2019-07-16T17:13:13Z"
			}
		}
	}
}`,
	"isBase64Encoded": false
};

const exampleInput2 = {
	"resource": "/registerZoomUser",
	"path": "/registerZoomUser",
	"httpMethod": "POST",
	"headers": {
		"accept": "*/*",
		"content-type": "application/x-www-form-urlencoded",
		"Host": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"Authorization": process.env.ZOOM_VERIFICATION_TOKEN,
		"User-Agent": "curl/7.69.1",
		"X-Amzn-Trace-Id": "Root=1-5ff62e24-76095b9f512d1ba418679265",
		"x-api-key": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
		"X-Forwarded-For": "189.203.45.5",
		"X-Forwarded-Port": "443",
		"X-Forwarded-Proto": "https"
	},
	"multiValueHeaders": {
		"accept": [
			"*/*"
		],
		"content-type": [
			"application/x-www-form-urlencoded"
		],
		"Host": [
			"k69og1xocl.execute-api.us-west-2.amazonaws.com"
		],
		"Authorization": [
			process.env.ZOOM_VERIFICATION_TOKEN
		],
		"User-Agent": [
			"curl/7.69.1"
		],
		"X-Amzn-Trace-Id": [
			"Root=1-5ff62e24-76095b9f512d1ba418679265"
		],
		"X-Forwarded-For": [
			"189.203.45.5"
		],
		"X-Forwarded-Port": [
			"443"
		],
		"X-Forwarded-Proto": [
			"https"
		]
	},
	"queryStringParameters": null,
	"multiValueQueryStringParameters": null,
	"pathParameters": null,
	"stageVariables": null,
	"requestContext": {
		"resourceId": "n7kinm",
		"resourcePath": "/registerZoomUser",
		"httpMethod": "POST",
		"extendedRequestId": "YvwlqGu_vHcF5lw=",
		"requestTime": "06/Jan/2021:21:39:48 +0000",
		"path": "/default/registerZoomUser",
		"accountId": "746240737045",
		"protocol": "HTTP/1.1",
		"stage": "default",
		"domainPrefix": "k69og1xocl",
		"requestTimeEpoch": 1609969188120,
		"requestId": "82fc8ffe-4d80-4648-99fb-eb77571eca29",
		"identity": {
			"cognitoIdentityPoolId": null,
			"cognitoIdentityId": null,
			"apiKey": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
			"principalOrgId": null,
			"cognitoAuthenticationType": null,
			"userArn": null,
			"apiKeyId": "csfd99zbnd",
			"userAgent": "curl/7.69.1",
			"accountId": null,
			"caller": null,
			"sourceIp": "189.203.45.5",
			"accessKey": null,
			"cognitoAuthenticationProvider": null,
			"user": null
		},
		"domainName": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"apiId": "k69og1xocl"
	},
	"body": `{
	"event": "webinar.participant_joined",
	"event_ts": 1234566789900,
	"payload": {
		"account_id": "o8KK_AAACq6BBEyA70CA",
		"operator": "rodrigosahagun@hotmail.com",
		"object": {
			"uuid": "czLF6FFFoQOKgAB99DlDb9g==",
			"id": "${process.env.ZOOM_ID}",
			"host_id": "uLoRgfbbTayCX6r2Q_qQsQ",
			"topic": "My Meeting",
			"type": 2,
			"start_time": "2021-02-11T07:00:00Z",
			"duration": 60,
			"timezone": "America/Los_Angeles",
			"participant": {
				"user_id": "16782040",
				"user_name": "shree",
				"id": "iFxeBPYun6SAiWUzBcEkX",
				"join_time": "2019-07-16T17:13:13Z"
			}
		}
	}
}`,
	"isBase64Encoded": false
};

const exampleInput3 = {
	"resource": "/registerZoomUser",
	"path": "/registerZoomUser",
	"httpMethod": "POST",
	"headers": {
		"accept": "*/*",
		"content-type": "application/x-www-form-urlencoded",
		"Host": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"Authorization": process.env.ZOOM_VERIFICATION_TOKEN,
		"User-Agent": "curl/7.69.1",
		"X-Amzn-Trace-Id": "Root=1-5ff62e24-76095b9f512d1ba418679265",
		"x-api-key": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
		"X-Forwarded-For": "189.203.45.5",
		"X-Forwarded-Port": "443",
		"X-Forwarded-Proto": "https"
	},
	"multiValueHeaders": {
		"accept": [
			"*/*"
		],
		"content-type": [
			"application/x-www-form-urlencoded"
		],
		"Host": [
			"k69og1xocl.execute-api.us-west-2.amazonaws.com"
		],
		"Authorization": [
			process.env.ZOOM_VERIFICATION_TOKEN
		],
		"User-Agent": [
			"curl/7.69.1"
		],
		"X-Amzn-Trace-Id": [
			"Root=1-5ff62e24-76095b9f512d1ba418679265"
		],
		"X-Forwarded-For": [
			"189.203.45.5"
		],
		"X-Forwarded-Port": [
			"443"
		],
		"X-Forwarded-Proto": [
			"https"
		]
	},
	"queryStringParameters": null,
	"multiValueQueryStringParameters": null,
	"pathParameters": null,
	"stageVariables": null,
	"requestContext": {
		"resourceId": "n7kinm",
		"resourcePath": "/registerZoomUser",
		"httpMethod": "POST",
		"extendedRequestId": "YvwlqGu_vHcF5lw=",
		"requestTime": "06/Jan/2021:21:39:48 +0000",
		"path": "/default/registerZoomUser",
		"accountId": "746240737045",
		"protocol": "HTTP/1.1",
		"stage": "default",
		"domainPrefix": "k69og1xocl",
		"requestTimeEpoch": 1609969188120,
		"requestId": "82fc8ffe-4d80-4648-99fb-eb77571eca29",
		"identity": {
			"cognitoIdentityPoolId": null,
			"cognitoIdentityId": null,
			"apiKey": "AhKYXTeSvF7YXuf9FwwtM7UYMyu3ySra50xNt9JV",
			"principalOrgId": null,
			"cognitoAuthenticationType": null,
			"userArn": null,
			"apiKeyId": "csfd99zbnd",
			"userAgent": "curl/7.69.1",
			"accountId": null,
			"caller": null,
			"sourceIp": "189.203.45.5",
			"accessKey": null,
			"cognitoAuthenticationProvider": null,
			"user": null
		},
		"domainName": "k69og1xocl.execute-api.us-west-2.amazonaws.com",
		"apiId": "k69og1xocl"
	},
	"body": `{
	"event": "webinar.participant_joined",
	"event_ts": 1234566789900,
	"payload": {
		"account_id": "o8KK_AAACq6BBEyA70CA",
		"operator": "eecanton@gmail.com",
		"object": {
			"uuid": "czLF6FFFoQOKgAB99DlDb9g==",
			"id": "${process.env.ZOOM_ID}",
			"host_id": "uLoRgfbbTayCX6r2Q_qQsQ",
			"topic": "My Meeting",
			"type": 2,
			"start_time": "2021-04-22T07:00:00Z",
			"duration": 60,
			"timezone": "America/Los_Angeles",
			"participant": {
				"user_id": "16782040",
				"user_name": "shree",
				"id": "iFxeBPYun6SAiWUzBcEkX",
				"join_time": "2019-07-16T17:13:13Z"
			}
		}
	}
}`,
	"isBase64Encoded": false
};

describe('Basic output', () => {
	before(async function () {
		const { statusCode, body } = await handler(exampleInput);
		this.statusCode = statusCode;
		this.body = body;

		db.configure({
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME
		});
	});
	after(async function () {
		const result = await db.query(`
			DELETE FROM ${process.env.DB_PREFIX}pa_user_progress
				WHERE user_id = 816 OR user_id = 927 OR user_id = 22;
		`);
	});

	it('Should return correct AWS Lambda response', async function () {
		assert.isString(this.body);
		assert.isNumber(this.statusCode);
	});
	it('Should add objectives of a part 1 user', async function () {
		const info = JSON.parse(this.body);
		let result = await db.query(`
			SELECT * 
				FROM ${process.env.DB_PREFIX}pa_user_progress 
					WHERE user_id = ${info.userID} 
						AND post_id = 75948;`);

		result = result[0];

		expect(result.length).to.equal(3);

		expect(result[0].user_id).to.equal(816);
		expect(result[0].post_id).to.equal(75948);
		expect(result[0].objective_id).to.equal(1);

		expect(result[1].user_id).to.equal(816);
		expect(result[1].post_id).to.equal(75948);
		expect(result[1].objective_id).to.equal(2);

		expect(result[2].user_id).to.equal(816);
		expect(result[2].post_id).to.equal(75948);
		expect(result[2].objective_id).to.equal(3);
	});
	it('Should add objectives of whole course user', async function () {
		const { statusCode, body } = await handler(exampleInput2);

		const info = JSON.parse(body);

		let result = await db.query(`
			SELECT * 
				FROM ${process.env.DB_PREFIX}pa_user_progress 
					WHERE user_id = ${info.userID} 
						AND post_id = 72823;`);

		result = result[0];

		expect(result.length).to.equal(3);

		expect(result[0].user_id).to.equal(927);
		expect(result[0].post_id).to.equal(72823);
		expect(result[0].objective_id).to.equal(1);

		expect(result[1].user_id).to.equal(927);
		expect(result[1].post_id).to.equal(72823);
		expect(result[1].objective_id).to.equal(2);

		expect(result[2].user_id).to.equal(927);
		expect(result[2].post_id).to.equal(72823);
		expect(result[2].objective_id).to.equal(3);
	});
	it('Should add objectives of a part 2 user', async function () {
		const { statusCode, body } = await handler(exampleInput3);

		const info = JSON.parse(body);
		// console.log(info);
		let result = await db.query(`
			SELECT * 
				FROM ${process.env.DB_PREFIX}pa_user_progress 
					WHERE user_id = ${info.userID} 
						AND post_id = 76643;`);

		result = result[0];

		expect(result.length).to.equal(3);

		expect(result[0].user_id).to.equal(22);
		expect(result[0].post_id).to.equal(76643);
		expect(result[0].objective_id).to.equal(13);

		expect(result[1].user_id).to.equal(22);
		expect(result[1].post_id).to.equal(76643);
		expect(result[1].objective_id).to.equal(14);

		expect(result[2].user_id).to.equal(22);
		expect(result[2].post_id).to.equal(76643);
		expect(result[2].objective_id).to.equal(15);
	});
});
