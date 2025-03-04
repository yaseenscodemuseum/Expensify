require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB (Updated)
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully"))
    .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Expense Tracker API is Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const expenseRoutes = require("./routes/expenseRoutes");  // ✅ Correct path
app.use("/api/expenses", expenseRoutes);

app.use((err, req, res, next) => {
    if (err instanceof URIError) {
      console.error("Malformed URI:", req.url);
      return res.status(400).send("Bad Request: Malformed URI");
    }
    next();
  });
  