import Joi from '@hapi/joi';

export const newnoteValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    title: Joi.string().min(4).required(),
    description: Joi.string().required(),
    colour: Joi.string().optional(),
    archive:Joi.boolean().optional(),    
    trash:Joi.boolean().optional()   
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
