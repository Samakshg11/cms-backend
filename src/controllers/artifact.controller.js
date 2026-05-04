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
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100);
  const skip = (page - 1) * limit;
  const searchQuery = typeof req.query.q === "string" ? req.query.q.trim() : "";
  const filter = { createdBy: req.user.id };

  if (searchQuery) {
    filter.$text = { $search: searchQuery };
  }

  const query = Artifact.find(filter).skip(skip).limit(limit).populate("createdBy", "email");

  if (searchQuery) {
    query.select({ score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
  } else {
    query.sort({ createdAt: -1 });
  }

  const [artifacts, total] = await Promise.all([query, Artifact.countDocuments(filter)]);

  res.json({
    data: artifacts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});
