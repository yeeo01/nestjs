import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm'
import * as path from 'path'
import { SnakeNamingStrategy } from 'typeorm-snake-naming-strategy'

export const db = (entryPath: string[]): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  inject: [ConfigService],
  name: 'default',
  useFactory: (configService: ConfigService) => ({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: [path.join(...entryPath, '/**/entity/**/*{.ts,.js}')],
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
  })
})
