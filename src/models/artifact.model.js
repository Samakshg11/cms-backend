const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 2000,
      set: (value) => (typeof value === "string" ? value.trim() : ""),
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform: (_, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
      },
    },
  }
);

artifactSchema.index({ title: "text", description: "text" });
artifactSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model("Artifact", artifactSchema);
