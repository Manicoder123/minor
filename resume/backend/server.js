require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User=require('./Schemas/userSchema');

const app = express();
const port = process.env.PORT || 3001;
const dbURI = process.env.DB_URI;

app.use(cors());
app.use(express.json());

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));


app.get('/users',async(req,res)=>{
    const users=await User.find();
    res.json(users);
});

app.post('/users/new',async(req,res)=>{
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password:req.body.password,
      branch:req.body.branch,
      regno:req.body.regno,
      });    
      
newUser.save()
    .then(() => {
      console.log('User saved to database');
      res.json('User saved to database');
    })
    .catch((err) => {
      console.log(err);
      res.json('Error saving user to database');
    });
});

app.delete('/users/delete/:userId',async(req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ regno:userId });

    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
});  