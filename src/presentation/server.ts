import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiples";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
);
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const fsLogRepository = new LogRepositoryImpl(new FileSystemDatasource());

const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log("Server started...");

    // const sedEmailLog = new SedEmailLog(emailService, fileSystemLogRepository);
    // sedEmailLog.execute([
    //   "barrazabreiner22@gmail.com",
    //   "breinerbarraza22@gmail.com",
    // ]);

    // CronService.createJop("*/5 * * * * *", () => {
    //   const url = "http://google.com";
    //   new CheckService(
    //     postgresLogRepository,
    //     () => console.log(`${url} is ok`),
    //     (error) => console.log(error)
    //   ).execute(url);
    // });

    CronService.createJop("*/5 * * * * *", () => {
      const url = "http://googlssse.com";
      new CheckServiceMultiple(
        [postgresLogRepository, mongoLogRepository, fsLogRepository],
        () => console.log(`${url} is ok`),
        (error) => console.log(error)
      ).execute(url);
    });
  }
}
