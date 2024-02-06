import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../libs/users-lib/src/entities/user.entity';
import { UsersLibModule, UsersLibService } from 'libs/users-lib';

@Module({
  imports: [UsersLibModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [],
})
export class UsersModule {}
