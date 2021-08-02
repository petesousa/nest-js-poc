import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAll() {
    const response = await this.userService.getAll();

    return response;
  }

  @Get('/:id')
  public async getOne(@Param('id') userId: number) {
    const response = await this.userService.getOne(userId);

    return response;
  }

  @Post()
  public async createOne(@Body() createUserRequest: CreateUserDTO) {
    const response = await this.userService.createOne(createUserRequest);

    return response;
  }

  @Put('/:id')
  public async updateOne(
    @Param('id') userId: number,
    @Body() updateUserRequest: UpdateUserDTO,
  ) {
    const response = await this.userService.updateOne(
      userId,
      updateUserRequest,
    );

    return response;
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOne(@Param('id') userId: number) {
    await this.userService.deleteOne(userId);
  }
}
