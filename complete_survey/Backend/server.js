const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const uri = process.env.DB_URL;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });

  const usersRouter = require('./routes/users');
  app.use('/users',usersRouter);
  const questionsRouter = require('./routes/questions');
  app.use('/questions',questionsRouter);

  

app.listen(port, () =>{
    console.log(`Server is running on Port: ${port}`);
});