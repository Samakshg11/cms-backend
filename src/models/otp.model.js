const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }  
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// save se pehle otp hash
otpSchema.pre("save", async function () {

  if (!this.isModified("otp")) return; // agar change nahi hua
  this.otp = await bcrypt.hash(this.otp, 10); // otp hash
});

module.exports = mongoose.model("OTP", otpSchema); 