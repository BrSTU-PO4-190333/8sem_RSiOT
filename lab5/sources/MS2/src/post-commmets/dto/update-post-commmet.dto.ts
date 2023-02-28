import { PartialType } from '@nestjs/swagger';
import { CreatePostCommmetDto } from './create-post-commmet.dto';

export class UpdatePostCommmetDto extends PartialType(CreatePostCommmetDto) {}
