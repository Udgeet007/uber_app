const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullname:{
    firstname:{
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
    }, 
    lastname:{
      type:String,
      minlength:[3, "Last name must be at least 3 characters long"]
    }
  },
  email:{
    type:String,
    required:true,
    unique:true,
    minlength:[5,'Email must be least 5 characters long'],
  },
  password:{
    type:String,
    required: true,
    select:false,
    minlength:[8, "Password should me alteast 8 characters with number and alphabets."],
    maxlength:[20,"Password should be less than 20 characters"]
  },
  socketId:{
    type:String,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id:this.id}, process.env.JWT_SECRET)
  return token;
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashedPassword = async function (password) {
  return await bcrypt.hash(password,10);
};


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;