import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostIsExistsGuard implements CanActivate {
  constructor(private postsService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const id: number = +req.params.postId;

    const postIsExists = await this.postsService.postIsExists(id);

    if (!postIsExists) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Пост по переданному postId не найден';
      throw new HttpException(message, status);
    }

    return true;
  }
}
