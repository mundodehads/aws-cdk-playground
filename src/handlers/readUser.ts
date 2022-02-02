import User from '../domain/entities/users';
import UsersRepository from '../domain/repositories/users';

async function getUser(userId: string): Promise<User> {
  const usersRepository = new UsersRepository();

  return usersRepository.getUser(userId);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export const main = async (event: any, context: any) => {
  try {
    const user: User = await getUser(event.pathParameters.userId);

    return {
      statusCode: 200,
      headers: {},
      body: JSON.stringify(user || {}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {},
      body: 'Internal Server Error',
    };
  }
};
