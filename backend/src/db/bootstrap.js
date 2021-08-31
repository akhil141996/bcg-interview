async function run({ knex }) {
    try {
        await knex.migrate.latest();
    } catch (e) {
        console.log(e)
        throw e;
    }
}
module.exports = run
