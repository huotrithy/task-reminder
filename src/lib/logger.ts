import winston from "winston";
import "winston-daily-rotate-file";

const logFolder = process.env.LOG_FOLDER || "logs";

const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  winston.format.json()
);

const fileTransport = new winston.transports.DailyRotateFile({
  filename: `${logFolder}/application-%DATE%.log`,
  datePattern: "YYYY-MMM-DD",
  zippedArchive: true,
  maxFiles: "7d",
});

const consoleTransport = new winston.transports.Console();
const transports: winston.transport[] = [consoleTransport];
if (process.env.NODE_ENV !== "production") {
  transports.push(fileTransport);
}

export const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports: transports,
});
