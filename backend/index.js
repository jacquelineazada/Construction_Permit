import express from "express";
import cors from "cors";
import "dotenv/config";

import user from "./routes/user_account.js";

const app = express();
const PORT = 4000;

const routes = [{ path: "/api/user", handler: user }];

app.use(cors());
app.use(express.json());

routes.forEach((route) => {
  app.use(route.path, route.handler);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  console.log("\nCTRL + C to stop the server\n");
});
