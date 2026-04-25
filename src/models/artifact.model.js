const mongoose = require("mongoose"); 

// artifact schema define
const artifactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // user id reference
      ref: "User",  // User model se link
      required: true
    }
  },
  {
    timestamps: true  
  }
);

module.exports = mongoose.model("Artifact", artifactSchema);