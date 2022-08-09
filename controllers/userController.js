const User = require('../models/userModel')


const getUsers = async (req, res) => {
    const Users = await User.find()
    // .sort({createdAt:-1})

    res.status(200).json(Users)
}

const createUser = async (req, res) => {

    const { username, scores } = req.body

    try {
        const user = await User.create({username, scores})
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const updateUser = async (req, res) => {

    const { id } = req.params

    const user = await User.findOneAndUpdate({_id: id}, {...req.body})

    res.status(204).json(user)
}

module.exports = { getUsers, updateUser, createUser }
