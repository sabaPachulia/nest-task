import { Module } from '@nestjs/common';
import { UsersLibService } from './services/users-lib.service';
import { usersLibModuleProviders } from './providers';

@Module({
  providers: [UsersLibService, ...usersLibModuleProviders],
  exports: [UsersLibService],
})
export class UsersLibModule {}
