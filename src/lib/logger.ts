import winston from "winston";
import "winston-daily-rotate-file";

const logFolder = process.env.LOG_FOLDER || "logs";
const fileTransport = new winston.transports.DailyRotateFile({
  filename: `${logFolder}/application-%DATE%.log`,
  datePattern: "YYYY-MMM-DD",
  zippedArchive: true,
  maxFiles: "7d",
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.json()
  ),
  transports: [new winston.transports.Console(), fileTransport],
});
