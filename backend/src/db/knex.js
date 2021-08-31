const options = {
	client: 'mysql2',
	connection: {
		host: process.env.MYSQL_HOST,
		port: process.env.MYSQL_PORT,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
		pool: {
			min: 10,
			max: 25
		},
		ssl: false
	},
	migrations: {
		tableName: 'knex_migrations',
		directory: `${__dirname}/migrations`
	},

};

const knex = require('knex')(options);

module.exports = knex;
