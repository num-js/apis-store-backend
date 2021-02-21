const userModel = require('../models/userModel');

/**
 * callback function
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getUsers = (req, res) => {
    try {
        // res.status(200).json({ data: 'NNN' });
        res.status(400).json({ message: err.message })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports = { getUsers }