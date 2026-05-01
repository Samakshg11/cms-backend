const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json( { limit: "10mb" }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("CMS API Running"));
app.get("/health", (req, res) => {
	res.status(200).json({
		status: "ok",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

app.use("/api/auth", require("./routes/auth.routes")); 
app.use("/api/artifacts", require("./routes/artifact.routes"));

app.use((req, res) => {
	res.status(404).json({ message: "Route not found" });
});

module.exports = app;
