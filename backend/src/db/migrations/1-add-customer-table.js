function up(knex) {
    return Promise.all([
        knex.schema.hasTable('customer_details').then(exists => {
            if (!exists) {
                return knex.schema.createTable('customer_details', table => {
                    table.integer('customer_id').primary()
                    table.string('gender')
                    table.string('income')
                    table.string('region')
                    table.string('marital_status')
                })
            }
            return Promise.resolve(true)
        })
    ])
}
function down(knex) {
    return Promise.all([
        knex.schema.hasTable('customer_details').then(exists => {
            if (exists) {
                return knex.schema.dropTable('customer_details')
            }
            return Promise.resolve(true)
        })
    ])
}

exports.up = up
exports.down = down
