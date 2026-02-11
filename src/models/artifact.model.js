const mongoose = require("mongoose"); 

// artifact schema define
const artifactSchema = new mongoose.Schema(
  {
    title: String,        
    description: String,  
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, // user id reference
      ref: "User"  // User model se link
    }
  },
  {
    timestamps: true  
  }
);

module.exports = mongoose.model("Artifact", artifactSchema);