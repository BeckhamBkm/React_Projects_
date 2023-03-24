const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: true
  }
});

  const Question = mongoose.model('Question', questionSchema,'Questions');

module.exports = Question;

