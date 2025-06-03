import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "../../generated/prisma";

const prismaClient = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const data = {
      ...log,
      level: severityEnum[log.level],
    };
    await prismaClient.logModel.create({ data });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<Array<LogEntity>> {
    const logs = await prismaClient.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });

    return logs.map(LogEntity.fromObject);
  }
}
