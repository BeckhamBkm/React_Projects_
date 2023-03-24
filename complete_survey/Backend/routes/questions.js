const router = require('express').Router();
let Question = require('../models/questions.model');

router.route('/').get((req,res) =>{
    Question.find()
    .then(questions => res.json(questions))
    .catch(err => res.status(400).json('Error: '+ err));
});


module.exports = router;