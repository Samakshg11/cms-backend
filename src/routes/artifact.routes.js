const router = require("express").Router(); // router create

const ctrl = require("../controllers/artifact.controller"); // controller import
const auth = require("../middlewares/auth.middleware"); // auth middleware


// create artifact (protected)
router.post("/", auth, ctrl.createArtifact);

// get artifacts (protected)
router.get("/", auth, ctrl.getArtifacts);

module.exports = router; // router export