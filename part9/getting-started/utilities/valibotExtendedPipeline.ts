import { PipeResult } from 'valibot';

export const isNotNaN =
  (message: string) =>
  (input: number): PipeResult<number> => {
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
