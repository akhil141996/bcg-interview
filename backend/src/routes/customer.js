const Router = require('express')
const api = require('../services');
const router = new Router()

// search policy data by customer id
router.get('/search/:id', async (req, res) => {
    try {
        const details = await api.searchPolicyWithCustomerId(req.params.id)
        return res.json({ status: true, details: details[0] })
    } catch (err) {
        console.log('err in customer/search/:id call', err)
        res.status(404).send({ status: false, msg: err })
    }
})

module.exports = router
