const User = require('../models/userModel')
const mongoose = require('mongoose')


const getUsers = async (req, res) => {
    const Users = await User.find({}).sort({createdAt:-1})

    res.status(200).json(Users)
}

const createUser = async (req, res) => {

    const { username, score } = req.body

    try {
        const user = await User.create({username, score})
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const updateUser = async (req, res) => {

    const user = await User.findOneAndUpdate({_id: id}, {...req.body})

    res.status(200).json(user)
}

module.exports = { getUsers, updateUser, createUser }
