const csv = require('csvtojson')

module.exports = {
    async migrateData({ knex }) {
        try {
            // Migration of the csv data.
            let customers_len = await knex.raw('SELECT COUNT(customer_id) FROM customer_details');
            let policies_len = await knex.raw('SELECT COUNT(policy_id) FROM policy_details');
            if (!customers_len[0][0]['COUNT(customer_id)'] && !policies_len[0][0]['COUNT(policy_id)']) {
                const csvFilePath = `${__dirname}/data.csv`
                const jsonArray = await csv().fromFile(csvFilePath);
                const customerData = [];
                const policies = [];
                jsonArray.forEach(record => {
                    const customerObj = {
                        customer_id: record.Customer_id,
                        gender: record.Customer_Gender,
                        income: record['Customer_Income group'],
                        region: record.Customer_Region,
                        marital_status: Boolean(record.Customer_Marital_status)
                    }
                    const policyObj = {
                        policy_id: record.Policy_id,
                        customer_id: record.Customer_id,
                        date_of_purchase: new Date(record['Date of Purchase']).toISOString().slice(0, 19).replace('T', ' '),
                        fuel: record.Fuel,
                        vehicle_segment: record.VEHICLE_SEGMENT,
                        premium: record.Premium,
                        bodily_injury_liability: Boolean(record['bodily injury liability']),
                        personal_injury_protection: Boolean(record['personal injury protection']),
                        property_damage_liability: Boolean(record['property damage liability']),
                        collision: Boolean(record.collision),
                        comprehensive: Boolean(record.comprehensive)
                    }
                    customerData.push(customerObj)
                    policies.push(policyObj)
                })
                await knex.batchInsert('customer_details', customerData);
                await knex.batchInsert('policy_details', policies);
            }
        } catch (err) {
            console.log('Error in migrateData', err)
            throw err;
        }
    }
}