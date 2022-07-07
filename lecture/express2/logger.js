import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
const { combine, printf } = winston.format;
const rTracer =  require('cls-rtracer')

const logDir = './log/';
const logDirDate = '%DATE%';
const maxFileSize = '10M';

const logger = winston.createLogger({
    level: 'debug',
    format: combine(
        printf(log => `[${new Date().toLocaleString().replace(/[TZ]/g, ' ').trim()}] [${rTracer.id()}] [${log.level}] ${log.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new (winstonDaily)({
            level: 'info',
            filename: `${logDir}${logDirDate}.log`,
            datePattern: 'YYYYMMDD',
            maxSize: maxFileSize,
            maxFiles: '90d'             // 로그 90일 저장
        })
    ]
});

logger.stream = {
    write: message => {
        logger.info(message)
        //logger.debug(message)
    }
}

export default logger;