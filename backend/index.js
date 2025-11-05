import express from "express";
import cors from "cors";
import "dotenv/config";

import user from "./routes/user_account.js";
import address from "./routes/address.js";
import building_owner from "./routes/building_owner.js";
import bldg_use_group from "./routes/bldg_use_group.js";

const app = express();
const PORT = 4000;

const routes = [
  { path: "/api/user", handler: user },
  { path: "/api/address", handler: address },
  { path: "/api/building-owner", handler: building_owner },
  { path: "/api/bldg-use-group", handler: bldg_use_group },
];

app.use(cors());
app.use(express.json());

routes.forEach((route) => {
  app.use(route.path, route.handler);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  console.log("\nCTRL + C to stop the server\n");
});
