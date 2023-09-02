export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

function parseArguments(args: string[]): number[] {
  const numberParams = args.slice(2);
  if (numberParams.length === 0) throw new Error('Not enough arguments');
  const isAllParamsNumber = numberParams.every(
    (numberString) => !isNaN(Number(numberString))
  );
  if (!isAllParamsNumber) throw new Error('There is some string in the data');
  return numberParams.map((numberString) => Number(numberString));
}

export function calculateExercises(target: number, weekParams: number[]): Result {
  const periodLength = weekParams.length;
  const trainingDays = weekParams.filter((execDay) => execDay > 0).length;
  const average =
    weekParams.reduce((sum, currentHourPerDay) => sum + currentHourPerDay, 0) /
    weekParams.length;
  let rating = 0;
  let ratingDescription = '';
  if(trainingDays > periodLength / 2 ) {
    rating++;
  }
  if (trainingDays === periodLength) {
    rating++;
  }
  if (average - target > 1) {
    rating++;
  }
  switch (rating) {
    case 0: {
      ratingDescription = 'You are bad';
      break;
    }
    case 1: {
      ratingDescription = 'You need to try harder';
      break;
    }
    case 2: {
      ratingDescription = 'Pretty good dude';
      break;
    }
    default: {
      ratingDescription = 'You are legendary';
      break;
    }
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success: average > target,
    rating,
    ratingDescription,
  };
}

try {
  const [target, ...weekParams] = parseArguments(process.argv);
  console.log(calculateExercises(target, weekParams));
} catch (error) {
  if (error instanceof Error) {
    console.error('Something bad happened. Cause: ', error.message);
  }
}
