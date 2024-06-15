import Joi from 'joi';

const registerSchema = Joi.object({
  characterName: Joi.string().min(4).max(15).required().messages({
    'string.empty': 'Character name is required',
    'string.min': 'Character name should have a minimum length of 4',
    'string.max': 'Character name should have a maximum length of 15',
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email',
  }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .messages({
      'string.empty': 'password is required.',
      'string.pattern.base':
        'password must be at least 6 characters and contain only alphabet and number.',
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'string.empty': 'confirm password is required.',
    'any.only': 'password and confirm password did not match',
  }),
});

const validateRegister = (input) => {
  const { error } = registerSchema.validate(input, { abortEarly: false });
  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});
    console.dir(error);
    return result;
  }
};

export default validateRegister;
