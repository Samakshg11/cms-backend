const Artifact = require("../models/artifact.model"); 
exports.createArtifact = async (req, res) => {

  const artifact = await Artifact.create({
    ...req.body,            // title, description
    createdBy: req.user.id  // logged in user id
  });

  res.json(artifact);
};

exports.getArtifacts = async (req, res) => {

  const artifacts = await Artifact
    .find()                     // sab artifacts lao
    .populate("createdBy", "email"); // user ka email show karo

  res.json(artifacts); // list return
};