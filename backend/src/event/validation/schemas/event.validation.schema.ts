import * as Joi from 'joi';

export const createEventValidationSchema = Joi.object().keys({
  title: Joi.string().required(),
});
