const Validator = require('../../models/validator.js');


test('Argv returns false if no argument is provided', () => {
  expect(Validator.Argv([])).toBe(false);
});

test('Argv returns false if blade does not start with @', () => {
  expect(Validator.Argv(['example.js', 'blade'])).toBe(false);
});
