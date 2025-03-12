import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model, RootFilterQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserDto } from './interfaces/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async createOrUpdateOne(user: UserDto): Promise<User> {
    return this.UserModel.findOneAndUpdate(
      { id: user.id },
      { ...user },
      { new: true, upsert: true },
    );
  }

  public async findOne(params: RootFilterQuery<UserDocument>): Promise<User> {
    return await this.UserModel.findOne(params);
  }

  public async getCount(): Promise<number> {
    return await this.UserModel.countDocuments()
  }
}
