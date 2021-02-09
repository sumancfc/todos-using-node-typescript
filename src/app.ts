import express, { Response, Request, NextFunction } from "express";
import { json } from "body-parser";

const app = express();

import todosRouter from "./routes/todos";

app.use(json());

app.use("/todos", todosRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
  next();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
