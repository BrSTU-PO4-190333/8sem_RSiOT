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
      type: 'postgres',
      host: process.env.DMS_HOST,
      port: Number(process.env.DMS_PORT),
      username: process.env.DMS_USER,
      password: process.env.DMS_PASS,
      database: process.env.DMS_NAME,
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
