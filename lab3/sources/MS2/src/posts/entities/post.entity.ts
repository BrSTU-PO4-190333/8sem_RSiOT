import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class PostEntity {
  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид поста',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Ид кользователя',
    example: 1,
  })
  @ManyToOne(() => UserEntity, (e: UserEntity) => e.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  @Column()
  userId: number;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Заголовок поста',
    example: 'С Новым годом!',
  })
  @Column()
  title: string;

  // = = = = = = = = = = = = = = = =

  @ApiProperty({
    description: 'Текст поста',
    example: 'Отмечается в ночь с 31 декабря по 1 января.',
  })
  @Column()
  content: string;

  // = = = = = = = = = = = = = = = =
}
