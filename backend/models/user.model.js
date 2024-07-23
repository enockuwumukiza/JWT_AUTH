const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name:{type:String, required:[true,"name is requried"], trim:true},
    email:{type:String, unique:[true, "your email must be a unique one!"], required:[true, "eail is required"]},

    password:{type:String, required:[true, "password is required"]}
  },

  {timestamps:true}
)

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10)
  }
  next();
});

userSchema.methods.comparePasswords = async function(candidatePassword){
  return await bcrypt.compare(candidatePassword, this.password)
}
const User = mongoose.model("User", userSchema);

module.exports = User;