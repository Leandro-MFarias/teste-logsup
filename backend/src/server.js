import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouter.js";
import productRoutes from "./routes/productRouter.js";

const allowedOrigins = [
  "http://localhost:5173",
  "https://teste-logsup.vercel.app",
];

const PORT = process.env.PORT || 3333;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.listen(PORT, console.log("Rodando na porta: ", PORT));
