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


app.listen(8080, async () => {
    setTimeout(async () => {
        await bootstrap({ knex })
    }, 10000)
    console.log('Listening on port 8080')
})

process.addListener('unhandledRejection', () => {
    process.exit(1)
})