import { ApiProperty } from '@nestjs/swagger';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('postComments')
export class PostCommmetEntity {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид поста',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид читателя',
    example: 1,
  })
  @ManyToOne(() => UserEntity, (e: UserEntity) => e.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'commentatorId' })
  @Column()
  commentatorId: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид поста',
    example: 1,
  })
  @ManyToOne(() => PostEntity, (e: PostEntity) => e.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  @Column()
  postId: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Коментарий читателя поста',
    example: 'Это видео мне помогло разобраться с темой.',
  })
  @Column()
  message: string;

  // = = = = = = = = = = = = = = = =
}
