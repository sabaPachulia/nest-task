import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';
import {
  IUsersRepository,
  RegisterUserData,
  RegisterUserSuccessResponse,
} from '../interfaces';
import { UsersRepository } from '../repositories';
import { UsersLibModuleTokens } from '../constants';

@Injectable()
export class UsersLibService {
  constructor(
    @Inject(UsersLibModuleTokens.usersRepository)
    private readonly usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  getAllUsers() {
    return this.usersRepository.findOne({ id: '' });
  }

  async registerUser(
    credentials: RegisterUserData,
  ): Promise<RegisterUserSuccessResponse> {
    const { email, firstName, lastName, password, phoneNumber } = credentials;

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      // TODO refactor error response
      throw new ConflictException('A user with this email already exists');
    }

    // Hashing password - "nika1123" => hashing => "dadadadadadad1313131ad",

    const user = this.usersRepository.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    const savedUser = await this.repo.save(user);

    const payload = { id: savedUser.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not Found');
    }

    return this.repo.remove(user);
  }

  async changePassword(id: number, newPassword: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = newPassword;

    const savedUser = await this.repo.save(user);
    console.log('update user', savedUser);
    return savedUser;
  }
}
