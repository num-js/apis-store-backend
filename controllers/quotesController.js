const quotesModel = require('../models/quotesModel');

/**
 * callback function - Get all Quotes
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getQuotes = async (req, res) => {
    try {
        const data = await quotesModel.find();
        if (data.length > 0) {
            res.status(200).json({
                message: 'Quotes Data Fetched',
                data: data
            });
        } else {
            res.status(404).json({
                message: 'No data found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


/**
 * callback function - Add new Quote
 * @param {object} req 
 * @param {object} res 
 * 
 */
const addQuote = async (req, res) => {
    const newQuoteData = new quotesModel(req.body);
    try {
        await newQuoteData.save();
        res.status(200).json({
            message: 'New quote added successfully',
            data: newQuoteData
        });
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Get a Specific quote's Data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getSpecificQuote = async (req, res) => {
    try {
        const specificQuote = await quotesModel.findById(req.params.quote_id);
        if (specificQuote !== null) {
            res.status(200).json({
                message: 'Fetched specific quote data',
                data: specificQuote
            });
        } else {
            res.status(404).json({
                message: 'Quote not found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Get a Random quote's Data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const getRandomQuote = async (req, res) => {
    try {
        const count = await quotesModel.countDocuments();
        const random = Math.floor(Math.random() * count);
        const randomQuote = await quotesModel.findOne().skip(random);
        if (randomQuote !== null) {
            res.status(200).json({
                message: 'Fetched random quote data',
                data: randomQuote
            });
        } else {
            res.status(404).json({
                message: 'Quote not found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Delete a Specific quote's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const deleteQuote = async (req, res) => {
    try {
        const deletedQuote = await quotesModel.findByIdAndDelete({ _id: req.params.quote_id });
        if (deletedQuote) {
            res.status(200).json({
                message: "Quote's data deleted",
                data: deletedQuote
            });
        } else {
            res.status(404).json({
                message: "Quote not Found"
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}

/**
 * callback function - Update a Specific quote's data
 * @param {object} req 
 * @param {object} res 
 * 
 */
const updateQuote = async (req, res) => {
    const { quote_id: _id } = req.params; //Extracting quote_id & giving a name _id at the same time
    const updateQuoteData = req.body;
    try {
        const updatedQuote = await quotesModel.findByIdAndUpdate(_id, updateQuoteData, { new: true });
        if (updatedQuote !== null) {
            res.status(200).json({
                message: "Quote's data Updated",
                data: updatedQuote
            });
        }else{
            res.status(404).json({
                message: 'Quote not Found'
            });
        }
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}


module.exports = { getQuotes, addQuote, getSpecificQuote, getRandomQuote, deleteQuote, updateQuote };