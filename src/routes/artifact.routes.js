const router = require("express").Router();

const ctrl = require("../controllers/artifact.controller");
const auth = require("../middlewares/auth.middleware");
const {
  validateCreateArtifact,
  validateArtifactQuery,
} = require("../middlewares/artifact.middleware");

router.post("/", auth, validateCreateArtifact, ctrl.createArtifact);
router.get("/", auth, validateArtifactQuery, ctrl.getArtifacts);

module.exports = router;
