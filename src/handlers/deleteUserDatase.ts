import UsersRepository from '../domain/repositories/users';

async function deleteUser(userId: string) {
  const usersRepository = new UsersRepository();
  const user = await usersRepository.getUser(userId);

  user.deleted = true;
  await usersRepository.saveUser(user);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export const main = async (event: any, context: any) => {
  try {
    const { userId } = event;

    await deleteUser(userId);

    return {
      status: 'SUCCEEDED',
    };
  } catch (error) {
    return {
      status: 'FAILED',
    };
  }
};
