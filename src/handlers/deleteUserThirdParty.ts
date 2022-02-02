// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/no-unused-vars
export const main = async (event: any, context: any) => {
  try {
    const { userId } = event;

    return {
      userId,
    };
  } catch (error) {
    throw new Error('Internal Server Error');
  }
};
