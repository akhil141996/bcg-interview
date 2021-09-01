const knex = require('../db/knex');

module.exports = {
    searchPolicyWithCustomerId: async (id) => {
        try {
            return await knex.raw(`SELECT * from policy_details pd join customer_details cd on pd.customer_id = cd.customer_id where cd.customer_id = ${id}`)
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    searchPolicyWithPolicyId: async (id) => {
        try {
            return await knex.raw(`SELECT * from policy_details pd join customer_details cd on pd.customer_id = cd.customer_id where pd.policy_id = ${id}`)
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    savePolicyDetailsById: async (policyData) => {
        try {
            return await knex('policy_details').where('policy_id', '=', policyData.policy_id).update(policyData)
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    saveCustomerDetailsById: async (customerData) => {
        try {
            return await knex('customer_details').where('customer_id', '=', customerData.customer_id).update(customerData)
        } catch (err) {
            console.log(err)
            throw err
        }
    },
    fetchPolicyData: async () => {
        try {
            return await knex.raw(`SELECT date_of_purchase, region from policy_details pd join customer_details cd on pd.customer_id = cd.customer_id`)
        } catch (err) {
            console.log(err)
            throw err
        }
    }
}