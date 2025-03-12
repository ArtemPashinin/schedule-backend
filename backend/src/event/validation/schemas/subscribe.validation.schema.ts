import * as Joi from 'joi';

export const subscribeValidationSchema = Joi.object().keys({
  title: Joi.string().required(),
  subscriberTgId: Joi.number().required(),
});
