import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUserCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SedEmailLog implements SendLogEmailUserCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}
  async execute(to: string | string[]): Promise<boolean> {
    try {
      const send = await this.emailService.sendEmailWithFileSystem(to);
      if (!send) {
        throw new Error("Error sending email");
      }
      const log = new LogEntity({
        message: `Email sent to ${to}`,
        level: LogSeverityLevel.low,
        origin: "send-email-logs.ts",
      });
      await this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin: "send-email-logs.ts",
      });
      await this.logRepository.saveLog(log);
      return false;
    }
  }
}
