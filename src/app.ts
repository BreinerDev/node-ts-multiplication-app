import "dotenv/config";
import { Server } from "./presentation/server";
import { envs } from "./config/plugins/envs.plugin";

(() => {
  main();
})();

function main() {
  // Server.start();

  console.log(envs.PORT);
}
