import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import ConnectDB from "./config/db.js";
//==========add all routes=================================
import authroute from "./routes/auth.route.js";
//import categoryroute from "./routes/category.route.js";
import transactionroute from "./routes/transaction.route.js";
import summaryroute from "./routes/summary.route.js";
import forgetroute from "./routes/forgetpassword.route.js";
//==============================================================
dotenv.config();
const app = express();

// Middleware==================================================
app.use(express.json());
//app.use(morgen());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTE_ND || "http://localhost:5173",
  })
);
/*app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);*/
//app.use(cookieParser());
//====================================================
app.use("/auth", authroute);
app.use("/api", transactionroute);
//app.use("/auth", categoryroute);
app.use("/api", summaryroute);
app.use("/api", forgetroute);

//====================================================

ConnectDB(); // Connect to MongoDB

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
