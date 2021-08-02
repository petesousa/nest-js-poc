import { UserStatus } from '../entity/user.entity';

export class UpdateUserDTO {
  username?: string;
  firstName?: string;
  lastName?: string;
  status?: UserStatus;
}
