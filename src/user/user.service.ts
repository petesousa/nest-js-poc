import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { User, UserStatus } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  public async createOne(createUserRequest: CreateUserDTO) {
    const user: User = new User();

    user.email = createUserRequest.email;
    user.firstName = createUserRequest.firstName;
    user.lastName = createUserRequest.lastName;
    user.username = createUserRequest.username;
    user.status = UserStatus.Active;

    await this.userRepository.save(user);

    const userDTO = this.entityToDTO(user);

    return userDTO;
  }

  private entityToDTO(user: User): UserDTO {
    const userDTO = new UserDTO();
    userDTO.id = user.id;
    userDTO.email = user.email;
    userDTO.firstName = user.firstName;
    userDTO.lastName = user.lastName;
    userDTO.username = user.username;
    userDTO.status = user.status;

    return userDTO;
  }

  public async getAll() {
    const users: User[] = await this.userRepository.find();

    const usersDTO: UserDTO[] = users.map((i: User) => this.entityToDTO(i));

    return usersDTO;
  }

  public async getOne(userId: number) {
    const user: User = await this.userRepository.findOne(userId);

    if (!user) throw new NotFoundException(`No user found with id ${userId}`);

    const userDTO = this.entityToDTO(user);

    return userDTO;
  }

  public async updateOne(userId: number, updateUserRequest: UpdateUserDTO) {
    const user: User = await this.getOne(userId);

    user.firstName = updateUserRequest.firstName || user.firstName;
    user.lastName = updateUserRequest.lastName || user.lastName;
    user.username = updateUserRequest.username || user.username;
    user.status = updateUserRequest.status || user.status;

    await this.userRepository.save(user);

    const userDTO = this.entityToDTO(user);

    return userDTO;
  }

  public async deleteOne(userId: number) {
    const user: User = await this.getOne(userId);

    await this.userRepository.remove(user);
  }
}
