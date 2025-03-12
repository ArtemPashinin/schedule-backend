import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection, RootFilterQuery } from 'mongoose';
import { EventDto } from 'src/event/interfaces/dto/event.dto';
import { SubscribeDto } from 'src/event/interfaces/dto/subscribe.dto';
import { EventDocument, Event } from 'src/event/schemas/event.schems';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly EventModel: Model<EventDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async createOne(event: EventDto): Promise<EventDocument> {
    const newEvent = new this.EventModel(event);
    return await newEvent.save();
  }

  public async findOne(params: RootFilterQuery<EventDocument>): Promise<Event> {
    return await this.EventModel.findOne(params);
  }

  public async findAll(): Promise<Event[]> {
    return await this.EventModel.find();
  }

  async createSubscribe(subscribe: SubscribeDto): Promise<EventDocument> {
    const event = await this.EventModel.findOne({ title: subscribe.title });

    if (!event) {
      throw new HttpException(
        `Event with title ${subscribe.title} not found`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!event.subscribers_id.includes(subscribe.subscriberTgId)) {
      // Добавляем подписчика в массив
      event.subscribers_id.push(subscribe.subscriberTgId);
      // Сохраняем изменения в базе данных
      await event.save();
    }

    return event;
  }
}
