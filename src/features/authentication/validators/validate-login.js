import Joi from 'joi';

const loginSchema = Joi.object({
  characterNameOrEmail: Joi.alternatives()
    .try(
      Joi.string().email({ tlds: false }).required(), // For email
      Joi.string().required() // For character name
    )
    .required(),
  password: Joi.string().required(),
});

const validateLogin = (input) => {
  const { error } = loginSchema.validate(input, { abortEarly: false });

  if (error) {
    const result = error.details.reduce((acc, el) => {
      acc[el.path[0]] = el.message;
      return acc;
    }, {});

    return result;
  }
};

export default validateLogin;
