import { Body, Controller, Post, Put } from '@nestjs/common';
import { EventService } from 'src/event/event.service';
import { EventDto } from 'src/event/interfaces/dto/event.dto';
import { SubscribeDto } from 'src/event/interfaces/dto/subscribe.dto';
import { EventDocument } from 'src/event/schemas/event.schems';
import { createEventValidationSchema } from 'src/event/validation/schemas/event.validation.schema';
import { subscribeValidationSchema } from 'src/event/validation/schemas/subscribe.validation.schema';
import { JoiValidationPipe } from 'src/pipes/joi-validation-pipe';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  public async createOne(
    @Body(new JoiValidationPipe(createEventValidationSchema)) body: EventDto,
  ): Promise<EventDocument> {
    return await this.eventService.createOne(body);
  }

  @Put('subscribe')
  public async addSubscription(
    @Body(new JoiValidationPipe(subscribeValidationSchema)) body: SubscribeDto,
  ) {
    return await this.eventService.createSubscribe(body);
  }
}
