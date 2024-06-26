import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGO_ALIAS } from './constants';

const getMongoConnectionString = ({ username, password, host, port, databaseName, authDatabase }): string =>
  `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: (config: ConfigService) => ({
      uri: getMongoConnectionString({
        username: config.get<string>(`${MONGO_ALIAS}.user`),
        password: config.get<string>(`${MONGO_ALIAS}.password`),
        host: config.get<string>(`${MONGO_ALIAS}.host`),
        port: config.get<string>(`${MONGO_ALIAS}.port`),
        authDatabase: config.get<string>(`${MONGO_ALIAS}.authBase`),
        databaseName: config.get<string>(`${MONGO_ALIAS}.name`),
      }),
    }),
    inject: [ConfigService],
  };
}
