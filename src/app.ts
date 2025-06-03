import { envs } from "./config/plugins/envs.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { PrismaClient } from "./generated/prisma";
import { Server } from "./presentation/server";

(() => {
  main();
})();
const prisma = new PrismaClient();

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Hola",
  //     origin: "src/app.ts",
  //     level: "LOW",
  //   },
  // });

  // const getLogs = await prisma.logModel.findUnique({ where: { id: 1 } });

  // console.log(getLogs);

  Server.start();
}
