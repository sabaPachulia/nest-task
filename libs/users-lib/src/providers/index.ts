import { UsersLibModuleTokens } from '../constants';
import { UsersRepository } from '../repositories';

export const usersLibModuleProviders = [
  {
    provide: UsersLibModuleTokens.usersRepository,
    useClass: UsersRepository,
  },
];
