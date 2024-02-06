import { User } from '../entities';
import { CreateUserData } from './create-user-data.interface';
import { FindUserData } from './find-user-data.interface';

export interface IUsersRepository {
  create(credentials: CreateUserData): Promise<'ok'>;
  findOne(credentials: FindUserData): Promise<unknown>;
}
