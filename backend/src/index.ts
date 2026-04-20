import express, { Request, Response } from "express";
import routes from "./routes/routes";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());

app.use(cors());

// root route
app.get("/", (req: Request, res: Response) => {
  res.send("Backend running 🚀");
});

// routes
app.use("/", routes);

// server start
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
