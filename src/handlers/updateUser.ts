import UsersRepository from '../domain/repositories/users';

interface IUserToUpdate {
  name?: string;
}

async function updateUser(userId: string, body: IUserToUpdate) {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.getUser(userId);

  const newUser = Object.assign(user, {
    name: body.name || user.name,
  });

  await usersRepository.saveUser(newUser);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export const main = async (event: any, context: any) => {
  try {
    const body = JSON.parse(event.body);
    await updateUser(event.pathParameters.userId, body);

    return {
      statusCode: 204,
      headers: {},
      body: JSON.stringify({}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {},
      body: 'Internal Server Error',
    };
  }
};
