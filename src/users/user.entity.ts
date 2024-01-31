import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`User with ID "${this.id}" was inserted`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Update User ID "${this.id}";`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Remove User ID "${this.id}";`);
  }
}
