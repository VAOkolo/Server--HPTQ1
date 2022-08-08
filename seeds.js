const Users = require('../server_hptq/models/userModel')

const seedUsers = [
    {
        username: "harvey891",
        scores: 1000
    },
    {
        username: "acewood",
        scores: 400
    },
    {
        username: "Raver19",
        scores: 1300
    },
    {
        username: "Boost504",
        scores: 2000
    },
    {
        username: "TaxiDerby5",
        scores: 1500
    },
    {
        username: "treatyToops",
        scores: 200
    }
]

const seedDB = async () => {
    // await Users.remove()
    await Users.insertMany(seedUsers)
}

module.exports = { seedUsers, seedDB }
