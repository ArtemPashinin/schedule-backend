import * as Joi from 'joi';

export const userValidationSchema = Joi.object()
  .keys({
    id: Joi.number().required(),
    first_name: Joi.string().max(256).optional().allow(null, ''),
    last_name: Joi.string().max(256).optional().allow(null, ''),
    username: Joi.string().max(256).optional().allow(null, ''),
    language_code: Joi.string().optional().allow(null, ''),
    status: Joi.string().valid('teacher', 'student').optional(),
    topic_id: Joi.number().optional(),
  })
  .unknown(true);
