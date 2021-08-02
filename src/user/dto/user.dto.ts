import { UserStatus } from '../entity/user.entity';

export class UserDTO {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
