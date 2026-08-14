import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  validateSync,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEven', async: false })
class IsEvenConstraint implements ValidatorConstraintInterface {
  validate(value: unknown) {
    return typeof value === 'number' && value % 2 === 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be an even number`;
  }
}

class DefaultMessageData {
  @Validate(IsEvenConstraint)
  ticketNumber: number;
}

class OverriddenMessageData {
  @Validate(IsEvenConstraint, { message: 'Номер квитка має бути парним' })
  ticketNumber: number;
}

const defaultCase = new DefaultMessageData();
defaultCase.ticketNumber = 7;

const overriddenCase = new OverriddenMessageData();
overriddenCase.ticketNumber = 7;

console.log(
  JSON.stringify(
    validateSync(defaultCase, {
      validationError: { target: false, value: false },
    }),
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    validateSync(overriddenCase, {
      validationError: { target: false, value: false },
    }),
    null,
    2,
  ),
);
