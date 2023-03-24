const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
        minlength:3
    },
    password:{
        type:String,
        trim:true,
        minlength:5,
        require: true,
        required: true
    }
},{timestamps:true,
});

userSchema.pre('save', async function (next) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.password, salt);
      this.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  });
  
const User = mongoose.model('User', userSchema,);

module.exports = User;