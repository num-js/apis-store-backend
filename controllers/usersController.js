const userModel = require('../models/userModel');

/**
 * callback function - Get all users
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getUsers = async (req, res) => {
    try {
        const data = await userModel.find();
        res.status(200).json({
            message: 'User Data Fetched',
            data: data
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/**
 * callback function - Add new User
 * @param {object} req 
 * @param {object} res 
 * 
 */
const addUser = async (req, res) => {
    const newUserData = new userModel(req.body);
    try {
        await newUserData.save();
        res.status(200).json({
            message: 'New user added successfully',
            data: newUserData
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
