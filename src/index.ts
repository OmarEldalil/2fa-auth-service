import 'reflect-metadata';
import app from './api'
import {dataSource} from "./database/db";
import {logger} from "./utils/logger";
import {redisClient} from "./database/redis";

const startServer = async () => {
    try {
        await dataSource.initialize();
        await redisClient.connect();
        app.listen(process.env.PORT, () => {
            logger.info(`Listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        logger.info('Error starting the server:', error);
    }
}

startServer()