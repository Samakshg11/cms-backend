
// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true }, 
//     email: { type: String, required: true, unique: true }, // unique email
//     password: { type: String, required: true },
//   },
//   { timestamps: true } // auto createdAt, updatedAt
// );

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose"); // mongoose import
const bcrypt = require("bcrypt"); // password hash ke liye

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,   
      unique: true,
      trim: true,
      lowercase: true
    },

    password: {
      type: String,
      required: true    
    },

    isVerified: {
      type: Boolean,
      default: false    
    }
  },
  {
    timestamps: true  
  }
);


// password hash karne ke liye pre save middleware
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// password compare karne ka method (login ke liye)
userSchema.methods.comparePassword = async function (enteredPassword) {

  // entered password ko database wale hash se compare karo
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);