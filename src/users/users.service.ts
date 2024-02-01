import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private jwtService: JwtService
  ) {}
  getAllUsers() {
    return this.repo.find();
  }

  async create(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.repo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('A user with this email already exists');
    }

    const user = this.repo.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
    });

    const savedUser = await this.repo.save(user);

    const payload = { sub: savedUser.id };

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
