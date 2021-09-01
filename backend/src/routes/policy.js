const Router = require('express')
const api = require('../services');
const router = new Router()
const Joi = require('joi');
const utility = require('../utils/utility');

// Joi validations for the save object
const schema = Joi.object({
    policy: Joi.any().required(),
    customer: Joi.any().required(),
})

// search policy data by policy id
router.get('/search/:id', async (req, res) => {
    try {
        const details = await api.searchPolicyWithPolicyId(req.params.id)
        return res.json({ status: true, details: details[0] })
    } catch (err) {
        console.log('err in policy/search/:id call', err)
        res.status(404).send({ status: false, msg: err })
    }
})

// save the policy data
router.post('/save', async (req, res) => {
    try {
        const { error } = schema.validate(req.body);
        if (error && error.details.length) {
            return res.status(401).send(error.details);
        }
        const { policy, customer } = req.body;
        const savedPolicyResponse = await api.savePolicyDetailsById(policy);
        const savedCustomerResponse = await api.saveCustomerDetailsById(customer);
        return res.json({ savedPolicyResponse, savedCustomerResponse, status: true })
    } catch (err) {
        console.log('Error in policy/save call', err);
        res.status(404).send({ status: false, msg: err })
    }
})

// fetch the analytics data of the policies
router.get('/policiesCount', async (req, res) => {
    try {
        const result = await api.fetchPolicyData();
        const groupedData = utility.groupData(result[0]);
        return res.json({ status: true, groupedData })
    } catch (err) {
        console.log('Error in policy/policiesCount call', err);
        res.status(404).send({ status: false, msg: err })
    }
})

module.exports = router
