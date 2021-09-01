const express = require('express');
const cors = require('cors');
const { config } = require('dotenv')
const router = require('./routes/index');
const bootstrap = require('./db/bootstrap');
const knex = require('./db/knex');

const app = express()
config()
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

// Add The Routes
router.build(app);

// Express app listening on port 8080
app.listen(8080, async () => {
    setTimeout(async () => {
        // Run the migrations to load the data from the csv file.
        await bootstrap({ knex })
    }, process.env.TIMEOUT)
    console.log('Listening on port 8080')
})

process.addListener('unhandledRejection', () => {
    process.exit(1)
})