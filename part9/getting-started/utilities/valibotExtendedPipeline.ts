export const isNotNaN = (message: string) => (input: number) => {
  const isInputNaN = isNaN(input);
  if (isInputNaN) {
    return {
      issue: {
        validation: 'custom',
        message,
        input,
      },
    };
  }
  return {
    output: input,
  };
};