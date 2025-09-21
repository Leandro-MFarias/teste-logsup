import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRouter.js";
import productRoutes from "./routes/productRouter.js"

const PORT = 3333;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser())

app.use("/api", userRoutes);
app.use("/api", productRoutes)

app.listen(PORT, console.log("Rodando na porta: ", PORT));
