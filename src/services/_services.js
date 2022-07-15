const runSchema = (schema) => async (unknown) => {
  const value = await schema.validateAsync(unknown);
  return value;
};

const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

const throwUserAlreadyExistsError = (message) => {
  const err = new Error(message);
  err.name = 'UserAlreadyExistsError';
  throw err;
};

const throwTokenNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'TokenNotFoundError';
  throw err;
};

const throwUserNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'UserNotFoundError';
  throw err;
};

const throwInvalidTokenError = (message) => {
  const err = new Error(message);
  err.name = 'InvalidTokenError';
  throw err;
};

const throwCategoryNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'CategoryNotFoundError';
  throw err;
};

const throwPostNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'PostNotFoundError';
  throw err;
};

module.exports = { 
  runSchema, 
  throwNotFoundError, 
  throwUserAlreadyExistsError,
  throwTokenNotFoundError,
  throwUserNotFoundError,
  throwInvalidTokenError,
  throwCategoryNotFoundError,
  throwPostNotFoundError,
};
