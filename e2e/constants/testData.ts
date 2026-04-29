export const createUser = () => ({
  email: `test-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@test.com`,
  password: "secret1",
  name: "Nigel",
});
