import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { userValidationSchema } from './validation/schemas/user.validation.schema';
import { UserDto } from './interfaces/dto/user.dto';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  public async createOne(
    @Body(new JoiValidationPipe(userValidationSchema)) body: UserDto,
  ) {
    return await this.userService.createOrUpdateOne(body);
  }
}
