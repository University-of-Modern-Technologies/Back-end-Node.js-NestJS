import 'reflect-metadata';
import { IsString, ValidateNested, validateSync } from 'class-validator';
import { Type, plainToInstance } from 'class-transformer';

class Address {
  @IsString()
  city: string;
}

class RegistrationData {
  @IsString()
  name: string;

  @ValidateNested()
  @Type(() => Address)
  address: Address;
}

const raw = { name: 'Олена', address: { city: 123 } };
const data = plainToInstance(RegistrationData, raw);

console.log(data.address instanceof Address);

const errors = validateSync(data, {
  validationError: { target: false, value: false },
});

console.log(JSON.stringify(errors, null, 2));
