const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 

const otpSchema = new mongoose.Schema(
  {
    email: String,      
    otp: String,        
    expiresAt: Date     
  },
  { timestamps: true }  
);

// save se pehle otp hash
otpSchema.pre("save", async function () {

  if (!this.isModified("otp")) return; // agar change nahi hua
  this.otp = await bcrypt.hash(this.otp, 10); // otp hash
});

module.exports = mongoose.model("OTP", otpSchema); 