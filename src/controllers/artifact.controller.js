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
  const requestedPage = Number(req.query.page);
  const requestedLimit = Number(req.query.limit);
  const page = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const limit = Number.isInteger(requestedLimit) && requestedLimit > 0
    ? Math.min(requestedLimit, 100)
    : 20;
  const skip = (page - 1) * limit;
  const searchQuery = typeof req.query.q === "string" ? req.query.q : "";
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
      hasPrevPage: page > 1,
      hasNextPage: page * limit < total,
    },
  });
});
