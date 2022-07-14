const runSchema = (schema) => async (unknown) => {
  const value = await schema.validateAsync(unknown);
  return value;
};

const throwNotFoundError = (message) => {
  const err = new Error(message);
  err.name = 'NotFoundError';
  throw err;
};

module.exports = { runSchema, throwNotFoundError };