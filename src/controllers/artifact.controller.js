const Artifact = require("../models/artifact.model"); 
exports.createArtifact = async (req, res) => {
  try {
    const artifact = await Artifact.create({
      ...req.body,            // title, description
      createdBy: req.user.id  // logged in user id
    });

    res.status(201).json(artifact);
  } catch (error) {
    res.status(500).json({ message: "Failed to create artifact" });
  }
};

exports.getArtifacts = async (req, res) => {
  try {
    const artifacts = await Artifact
      .find()                     // sab artifacts lao
      .sort({ createdAt: -1 })
      .populate("createdBy", "email"); // user ka email show karo

    res.json(artifacts); // list return
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch artifacts" });
  }
};