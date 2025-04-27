import dotenv from "dotenv"
import { app } from "./server";
import { DB } from "./utils/db-config";

dotenv.config({
    path:".env.local"
})


DB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("server is on", process.env.PORT);
    });
  })
  .catch((e) => {
    console.log(e);
  });
