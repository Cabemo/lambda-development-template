const { DateTime } = require('luxon');
const db = require('mysql2-promise')();
const { google } = require('googleapis');
const nodemailer = require('nodemailer');
// const Ontraport = require('@cabemo/op');


const weekInfo = {
	'2/11/2021': {
		column: 1,
		0: {
			objectiveIDs: [1, 2, 3],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [1, 2, 3],
			post_id: 75948
		}
	}
	,
	'2/18/2021': {
		column: 2,
		0: {
			objectiveIDs: [4, 5, 6],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [4, 5, 6],
			post_id: 75948
		}
	}
	,
	'2/25/2021': {
		column: 3,
		0: {
			objectiveIDs: [7, 8, 9],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [7, 8, 9],
			post_id: 75948
		}
	}
	,
	'3/4/2021': {
		column: 4,
		0: {
			objectiveIDs: [10, 11, 12],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [10, 11, 12],
			post_id: 75948
		}
	}
	,
	'3/11/2021': {
		column: 5,
		0: {
			objectiveIDs: [13, 14, 15],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [13, 14, 15],
			post_id: 75948
		}
	}
	,
	'3/18/2021': {
		column: 6,
		0: {
			objectiveIDs: [16, 17, 18],
			post_id: 72823,
		},
		1: {
			objectiveIDs: [16, 17, 18],
			post_id: 75948
		}
	}
	,
	'3/25/2021': {
		column: 7,
		0: {
			objectiveIDs: [19, 20, 21],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [1, 2, 3],
			post_id: 76643
		},
	}
	,
	'4/1/2021': {
		column: 8,
		0: {
			objectiveIDs: [22, 23, 24],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [4, 5, 6],
			post_id: 76643
		},
	}
	,
	'4/8/2021': {
		column: 9,
		0: {
			objectiveIDs: [25, 26, 27],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [7, 8, 9],
			post_id: 76643
		},
	}
	,
	'4/15/2021': {
		column: 10,
		0: {
			objectiveIDs: [28, 29, 30],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [10, 11, 12],
			post_id: 76643
		},
	}
	,
	'4/22/2021': {
		column: 11,
		0: {
			objectiveIDs: [31, 32, 33],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [13, 14, 15],
			post_id: 76643
		},
	}
	,
	'4/29/2021': {
		column: 12,
		0: {
			objectiveIDs: [34, 35, 36],
			post_id: 72823,
		},
		2: {
			objectiveIDs: [16, 17, 18],
			post_id: 76643
		},
	}
};

process.env.TZ = 'America/Los_Angeles';
const auth = new google.auth.GoogleAuth({
	keyFile: 'keyFile.json',
	scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const transporter = nodemailer.createTransport({
	host: 'email-smtp.us-east-2.amazonaws.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SES_USER,
		pass: process.env.SES_PASS
	}
})

const addAttendeeToSpreadsheet = async (data) => {
	const sheets = google.sheets({ version: 'v4', auth });

	try {
		const spreadsheetData = await sheets.spreadsheets.values.get({
			spreadsheetId: process.env.SPREADSHEET_ID,
			range: 'Sheet1!A1:M500'
		});
		const rows = spreadsheetData.data.values;

		// Find if the user already exist
		let userRow, user;
		for (let i = 1; i < rows.length; i++) {
			if (rows[i][0] === data.userEmail) {
				userRow = i;
			}
		}

		if (userRow) {
			user = rows[userRow];
			user[weekInfo[data.date].column] = 'Yes';
			rows[userRow] = user;
		} else {
			user = new Array(data.userEmail, 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No', 'No');
			user[weekInfo[data.date].column] = 'Yes';
			rows.push(user);
		}

		await sheets.spreadsheets.values.update({
			spreadsheetId: process.env.SPREADSHEET_ID,
			range: `Sheet1!A1:M500`,
			valueInputOption: 'RAW',
			requestBody: {
				majorDimension: 'ROWS',
				range: `Sheet1!A1:M500`,
				values: rows
			}
		});

	} catch (err) {
		transporter.sendMail({
			from: 'canton@adizes.com',
			to: 'canton+attendee@adizes.com',
			subject: 'Google Sheets Error',
			html: `<h1>${err.message}</h1>`
		});
	}
};

const handler = async (event) => {
	console.log(event);
	const response = {
		statusCode: 200,
		body: ''
	};
	const validationToken = event.headers.Authorization;
	// let op;

	// Validate that the information comes from our Zoom Webhook
	if (validationToken !== process.env.ZOOM_VERIFICATION_TOKEN) {
		response.body = 'Unauthorized';
	} else {

		try {
			console.log('- Connecting database');
			db.configure({
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				host: process.env.DB_HOST,
				database: process.env.DB_NAME
			});
			// op = new Ontraport(process.env.ONTRAPORT_APP_ID, process.env.ONTRAPORT_API_KEY);
			const zoomData = JSON.parse(event.body);
			const zoomID = zoomData.payload.object.id;
			const userEmail = zoomData.payload.operator;
			const date = DateTime.fromFormat(zoomData.payload.object.start_time.split('T')[0], 'yyyy-LL-dd').toFormat('L/dd/yyyy');
			// const objectiveIDs = weekInfo[date].objectiveIDs;
			// const tagID = weekInfo[date];

			if (zoomID === process.env.ZOOM_ID) {
				console.log('- Querying users');
				let result = await db.query(`
					SELECT * 
						FROM ${process.env.DB_PREFIX}users 
							WHERE user_email = '${userEmail}';`);

				result = result[0];

				if (result.length > 0) {
					const userID = result[0].ID;
					console.log('- Querying meta value');
					result = result = await db.query(`
						SELECT meta_value FROM ${process.env.DB_PREFIX}usermeta
							WHERE meta_key = 'mastering_change' AND user_id = ${userID}`);

					result = result[0];

					if (result.length > 0) {
						const courseID = result[0].meta_value;
						const objectiveIDs = weekInfo[date][courseID]['objectiveIDs'];
						const post_id = weekInfo[date][courseID]['post_id'];
						console.log('- Adding objectives');
						for (let objectiveID of objectiveIDs) {
							result = await db.query(`
								SELECT *
									FROM ${process.env.DB_PREFIX}pa_user_progress
										WHERE
											user_id = ${userID} AND 
											post_id = ${post_id} AND 
											objective_id = ${objectiveID};
							`);
							result = result[0];
							if (result.length < 1) {
								result = await db.query(`
									INSERT INTO ${process.env.DB_PREFIX}pa_user_progress (user_id, post_id, objective_id)
											VALUES (${userID}, ${post_id}, ${objectiveID});`);
							}
						}
						console.log('Complete');
						const res = {
							date: date.toString(),
							userEmail,
							userID,
							objectiveIDs,
							post_id
							// tagID
						};
						// await op.tagContact(userEmail, tagID);
						console.log('- Editing GSheet');
						await addAttendeeToSpreadsheet(res);
						transporter.sendMail({
							from: 'canton@adizes.com',
							to: 'canton+attendee@adizes.com',
							subject: 'Attendee week marked as complete',
							html: `
								<ul>
									<li><h3>DATE:</h3> ${date}</li>
									<li><h3>USER EMAIL:</h3> ${userEmail}</li>
									<li><h3>USER ID:</h3> ${userID}</li>
									<li><h3>OBJECTIVE IDS:</h3> ${objectiveIDs}</li>
								</ul>`
						});
						console.log('- Done');
						response.body = JSON.stringify(res);
					}

				}
			}
		} catch (err) {
			transporter.sendMail({
				from: 'canton@adizes.com',
				to: 'canton+attendee@adizes.com',
				subject: 'Lambda error',
				html: `<h1>${err.message}</h1>`
			});
		}
	}


	return response;
};

exports.handler = handler;
