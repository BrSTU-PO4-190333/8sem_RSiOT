import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  // = = = = = = = = = = = = = = = =

  @PrimaryGeneratedColumn()
  id: number;

  // = = = = = = = = = = = = = = = =

  @Column()
  login: string;

  // = = = = = = = = = = = = = = = =

  @Column()
  email: string;

  // = = = = = = = = = = = = = = = =

  @Column()
  hashPassword: string;

  // = = = = = = = = = = = = = = = =
}
