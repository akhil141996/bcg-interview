function up(knex) {
    return Promise.all([
        knex.schema.hasTable('policy_details').then(exists => {
            if (!exists) {
                return knex.schema.createTable('policy_details', table => {
                    table.integer('policy_id').primary()
                    table.integer('customer_id').references('customer_id').inTable('customer_details')
                    table.datetime('date_of_purchase')
                    table.string('fuel')
                    table.string('vehicle_segment')
                    table.string('premium')
                    table.boolean('bodily_injury_liability')
                    table.boolean('personal_injury_protection')
                    table.boolean('property_damage_liability')
                    table.boolean('collision')
                    table.boolean('comprehensive')
                })
            }
            return Promise.resolve(true)
        })
    ])
}
function down(knex) {
    return Promise.all([
        knex.schema.hasTable('policy_details').then(exists => {
            if (exists) {
                return knex.schema.dropTable('policy_details')
            }
            return Promise.resolve(true)
        })
    ])
}

exports.up = up
exports.down = down
