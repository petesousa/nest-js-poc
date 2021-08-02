import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserStatus {
  Active = 0,
  Removed = 1,
  Blocked = 2,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 24 })
  username: string;

  @Column({ nullable: false, length: 75 })
  email: string;

  @Column({ nullable: false, length: 24 })
  firstName: string;

  @Column({ nullable: false, length: 24 })
  lastName: string;

  @Column({ nullable: false, default: UserStatus.Active })
  status: UserStatus;
}
