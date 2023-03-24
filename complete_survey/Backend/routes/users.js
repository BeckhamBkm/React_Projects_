const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const genToken = (_id) =>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'5d'})

}

router.route('/').get((req,res) =>{
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: '+ err));
});


router.route('/add').post(async (req,res) =>{

    
    const user = await User.findOne({
        username: req.body.username
    })

    if(user){
        res.json("Username already Exists \n Try Logging in Instead")
    }
    else{
        const username = req.body.username;
        const password = req.body.password;
    
    const newUser = new User({username,password});
    const token = genToken(newUser._id);
    newUser.save()
    
    .then(() => res.status(200).json({ status: 'New user Registered',username,token }))
    .catch(err => res.status(400).json('Error' + err))
    }
    
});

router.post('/login', async (req, res) => {
    try{
  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({username});

  const token = genToken(user._id);

  // Check if user exists
  if (!user) {   
    return res.status(401).json({ message: 'Username doesn\'t exist, Register Instead' });
  }

  // Check if password is correct
  const isMatch = await bcrypt.compare(password,user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid Password' });
  }
  else
    {
        
        return res.json({ status: 'Logged In',username,token});
    }
}catch(error){
    res.status(400).json({ message: 'Error logging in', error: error.message });
}
}
);

module.exports = router;