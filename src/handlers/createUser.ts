import User from '../domain/entities/users';
import UsersRepository from '../domain/repositories/users';

async function createUser(name: string): Promise<string> {
  const user = Object.assign(new User(), {
    name,
  });

  const usersRepository = new UsersRepository();
  const newUser = await usersRepository.saveUser(user);

  return newUser.userId;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export const main = async (event: any, context: any) => {
  try {
    const { name } = JSON.parse(event.body);

    const userId = await createUser(name);
    return {
      statusCode: 201,
      headers: { Location: `${event.path}/${userId}` },
      body: JSON.stringify({ userId }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {},
      body: 'Internal Server Error',
    };
  }
};
