import { MinLength, ValidationArguments, validateSync } from 'class-validator';

class StaticMessageData {
  @MinLength(3, { message: "Ім'я має містити щонайменше 3 символи" })
  name: string;
}

class InterpolatedMessageData {
  @MinLength(3, {
    message: (args: ValidationArguments) =>
      `Поле ${args.property} отримало значення "${args.value}", а потребує щонайменше ${args.constraints[0]} символів`,
  })
  name: string;
}

const staticCase = new StaticMessageData();
staticCase.name = 'О';

const interpolatedCase = new InterpolatedMessageData();
interpolatedCase.name = 'О';

console.log(
  JSON.stringify(
    validateSync(staticCase, {
      validationError: { target: false, value: false },
    }),
    null,
    2,
  ),
);

console.log(
  JSON.stringify(
    validateSync(interpolatedCase, {
      validationError: { target: false, value: false },
    }),
    null,
    2,
  ),
);
