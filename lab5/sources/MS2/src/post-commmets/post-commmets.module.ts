import { forwardRef, Module } from '@nestjs/common';
import { PostCommmetsService } from './post-commmets.service';
import { PostCommmetsController } from './post-commmets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostCommmetEntity } from './entities/post-commmet.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostCommmetEntity]),
    forwardRef(() => PostsModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [PostCommmetsController],
  providers: [PostCommmetsService],
})
export class PostCommmetsModule {}
