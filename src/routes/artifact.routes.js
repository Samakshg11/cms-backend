const router = require("express").Router();

const ctrl = require("../controllers/artifact.controller");
const auth = require("../middlewares/auth.middleware");
const { validateCreateArtifact } = require("../middlewares/artifact.middleware");

router.post("/", auth, validateCreateArtifact, ctrl.createArtifact);
router.get("/", auth, ctrl.getArtifacts);

module.exports = router;
