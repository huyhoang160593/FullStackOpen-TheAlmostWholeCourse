interface BMIParams {
  weight_in_kg: number,
  height_in_cm: number
}

function parseArguments(args: string[]): BMIParams {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height_in_cm: Number(args[2]),
      weight_in_kg: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export function calculateBmi(height_in_cm: number, weight_in_kg: number): string {
  const result = weight_in_kg / Math.pow(height_in_cm / 100, 2);
  switch (true) {
    case result < 18.5:
      return 'Underweight';
    case result > 24.9:
      return 'Overweight';
    default:
      return 'Normal (healthy weight)';
  }
}

try {
  const { height_in_cm, weight_in_kg } = parseArguments(process.argv);
  console.log(calculateBmi(height_in_cm, weight_in_kg));
} catch (error) {
  if (error instanceof Error) {
    console.error('Something bad happened. Cause: ', error.message);
  }
}