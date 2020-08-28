const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const incomeExpense = new Schema ({
    value: { type: Number, required: true },
    description: { type: String, required: true, minlength: 6 },
    date: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    type: { type: String, required: true }
});


module.exports = mongoose.model('IncomeExpense', incomeExpense);