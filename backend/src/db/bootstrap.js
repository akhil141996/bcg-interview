const { migrateData } = require("./migrate");

async function run({ knex }) {
    try {
        await knex.migrate.latest();
        await migrateData({ knex })
    } catch (e) {
        console.log(e)
        throw e;
    }
}
module.exports = run
