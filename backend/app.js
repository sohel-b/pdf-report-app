const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth/authRoutes");
const verifyToken = require("./utils/authMiddleware");
const reportRoutes = require("./routes/report");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/", reportRoutes);
app.use("/auth", authRoutes);
app.use("/generate-report", verifyToken);

app.listen(PORT, () => {
  console.log(`✅ Server at http://localhost:${PORT}`);
});

process.on("exit", (code) => {
  console.log("Process exited with code:", code);
});
