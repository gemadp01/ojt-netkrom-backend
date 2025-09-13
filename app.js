import express from "express";
import userRoutes from "./routes/userRoutes";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
// app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
