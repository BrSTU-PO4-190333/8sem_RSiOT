import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CreatorCommentIsExistsGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const commentatorId = req.body.commentatorId;

    const userIsExists = await this.usersService.userIsExists(commentatorId);

    if (!userIsExists) {
      const status = HttpStatus.NOT_FOUND;
      const message = 'Пользователь по передданному commentatorId не найден';
      throw new HttpException(message, status);
    }

    return true;
  }
}
