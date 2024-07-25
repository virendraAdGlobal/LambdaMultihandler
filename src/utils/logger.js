const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
require('dotenv').config();
const globalsettingsconfigLogger = require('../config/environment.json')['winstonapplicationlog'];
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}
const level = () => {
  const env = process.env.NODE_ENV
  const isDevelopment = env === 'development' || env === 'localhost'
  return isDevelopment ? 'debug' : 'warn'
}
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
winston.addColors(colors)
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)
const transports = [
  new winston.transports.Console(),
  new (winston.transports.DailyRotateFile)({
    frequency: `${globalsettingsconfigLogger.FREQUENCY}d`,
    filename: './/applicationlogs/application-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: `${globalsettingsconfigLogger.MAX_SIZE}m`,
    maxFiles: `${globalsettingsconfigLogger.MAX_FILE_SIZE}d`,
    level: 'error'
  }),
  new (winston.transports.DailyRotateFile)({
    frequency: `${globalsettingsconfigLogger.FREQUENCY}d`,
    filename: './/applicationlogs/http-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    // zippedArchive: true,
    maxSize: `${globalsettingsconfigLogger.MAX_SIZE}m`,
    maxFiles: `${globalsettingsconfigLogger.MAX_FILE_SIZE}d`,
    level: 'http'
  }),
  new (winston.transports.DailyRotateFile)({
    frequency: `${globalsettingsconfigLogger.FREQUENCY}d`,
    filename: './/applicationlogs/all-error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: `${globalsettingsconfigLogger.MAX_SIZE}m`,
    maxFiles: `${globalsettingsconfigLogger.MAX_FILE_SIZE}d`,
  }),
]
const logger = winston.createLogger({
  level: 'debug',
  levels,
  logFormat,
  transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: './/applicationlogs/exception.log' }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: './/applicationlogs/rejections.log' }),
  ],
  exitOnError: true
})
// const logFormat = winston.format.combine(
//  winston.format.colorize({ all: true }),
//  winston.format.timestamp(),
//  winston.format.align(),
//  winston.format.printf(
//   info => `${info.timestamp} ${info.level}: ${info.message}`,
// ),
//  winston.format.json()
// );
// const transport = new DailyRotateFile({
//  filename: './/logs/application-error-%DATE%.log',
//  frequency: '1d',
//  datePattern: 'YYYY-MM-DD-HH',
//  zippedArchive: true,
//  maxSize: '8k',
//  maxFiles: '14d',
//  prepend: true,
//  level: 'error',
// });
// transport.on('rotate', function (oldFilename, newFilename) {
// // call function like upload to s3 or on cloud
// });
// const logger = winston.createLogger({
// format: logFormat,
// transports: [
//      transport,
//      new winston.transports.Console({level: "info", handleExceptions: true,json: false,colorize: true}),
// ],
// exceptionHandlers: [
//     new winston.transports.File({ filename: './/logs/exception.log' }),
// ],
// rejectionHandlers: [
//   new winston.transports.File({ filename: './/logs/rejections.log' }),
// ],
// exitOnError: false
// });
module.exports = logger;