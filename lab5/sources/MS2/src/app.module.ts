import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/entities/post.entity';
import { PostCommmetsModule } from './post-commmets/post-commmets.module';
import { PostCommmetEntity } from './post-commmets/entities/post-commmet.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRoot({
      type:
        process.env.MS2_DB_TYPE == 'postgres'
          ? 'postgres'
          : process.env.MS2_DB_TYPE == 'mysql'
          ? 'mysql'
          : process.env.MS2_DB_TYPE == 'mariadb'
          ? 'mariadb'
          : 'postgres',
      host: process.env.MS2_DB_HOST,
      port: Number(process.env.MS2_DB_PORT),
      username: process.env.MS2_DB_USER,
      password: process.env.MS2_DB_PASS,
      database: process.env.MS2_DB_NAME,
      entities: [UserEntity, PostEntity, PostCommmetEntity],
      logging: process.env.NODE_ENV === 'dev',
      synchronize: false,
    }),
    UsersModule,
    PostsModule,
    PostCommmetsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
