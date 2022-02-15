const constants = require("./constants")

module.exports = {
    // Create the groupedData for analytics
    groupData: (data) => {
        try {
            const obj = {
                0: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                1: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                2: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                3: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                4: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                5: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                6: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                7: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                8: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                9: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                10: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
                11: {
                    North: 0,
                    South: 0,
                    East: 0,
                    West: 0,
                    All: 0
                },
            }
            data.forEach(record => {
                const region = record.region
                const month = new Date(record.date_of_purchase).getMonth()
                const t = obj[month];
                t.All = t.All + 1;
                t[region] = t[region] + 1
            })
            const finalArr = [];
            Object.keys(obj).forEach(month => {
                finalArr.push({
                    name: constants.months()[month],
                    ...obj[month]
                })
            })
            return finalArr;
        } catch (err) {
            console.log(err);
            throw err
        }
    }
}