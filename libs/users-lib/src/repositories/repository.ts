import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';
import { CreateUserData, IUsersRepository } from '../interfaces';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public async create(credentials: CreateUserData): Promise<'ok'> {
    return 'ok';
  }
}
