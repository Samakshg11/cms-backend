const Artifact = require("../models/artifact.model");
const asyncHandler = require("../utils/async-handler");

exports.createArtifact = asyncHandler(async (req, res) => {
  const artifact = await Artifact.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json(artifact);
});

exports.getArtifacts = asyncHandler(async (req, res) => {
  const artifacts = await Artifact.find()
    .sort({ createdAt: -1 })
    .populate("createdBy", "email");

  res.json(artifacts);
});
