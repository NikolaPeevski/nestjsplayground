import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  Param
} from '@nestjs/common';
import { ErrorResponseService } from '../shared/error-response/error-response.service';
import { CreateUserDto } from './dto/create-user-dto';
import { User } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly errorResponseService: ErrorResponseService
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): User | void {
    const user = this.userService.create({
      name: createUserDto.name,
      createdAt: new Date()
    });
    return (
      user ??
      this.errorResponseService.throw(
        HttpStatus.UNPROCESSABLE_ENTITY,
        'Name must be unique!'
      )
    );
  }

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })
    )
    id: number
  ): User | void {
    const user: User = this.userService.findOne(id);

    return (
      user ??
      this.errorResponseService.throw(
        HttpStatus.NOT_FOUND,
        `User with id: ${id} does not exist!`
      )
    );
  }
}
