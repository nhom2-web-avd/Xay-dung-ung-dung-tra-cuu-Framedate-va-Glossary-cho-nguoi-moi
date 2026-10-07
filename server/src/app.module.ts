import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { User } from './entities/user.entity';
import { Character } from './entities/character.entity';
import { CharacterMove } from './entities/character-move.entity';
import { CharacterBaseStat } from './entities/character-base-stat.entity';
import { Glossary } from './entities/glossary.entity';

import { AuthModule } from './modules/auth/auth.module';
import { CharacterModule } from './modules/character/character.module';
import { GlossaryModule } from './modules/glossary/glossary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const useSsl = configService.get<string>('DB_SSL') === 'true';
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST') || '127.0.0.1',
          port: Number(configService.get<number>('DB_PORT') || 3306),
          username: configService.get<string>('DB_USER') || 'root',
          password: configService.get<string>('DB_PASSWORD') || '',
          database: configService.get<string>('DB_NAME') || 'idol_showdown_wiki',
          entities: [User, Character, CharacterMove, CharacterBaseStat, Glossary],
          synchronize: false, // Dùng schema SQL có sẵn
          logging: false,
          ssl: useSsl
            ? {
                rejectUnauthorized: false,
              }
            : false,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../uploads'),
      serveRoot: '/uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '../../dist'),
      exclude: ['/api/(.*)'],
    }),
    AuthModule,
    CharacterModule,
    GlossaryModule,
  ],
})
export class AppModule {}
