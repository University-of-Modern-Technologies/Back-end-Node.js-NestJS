import { IsString, ValidateNested, validateSync } from 'class-validator';

class Address {
  @IsString()
  city: string;
}

class RegistrationData {
  @IsString()
  name: string;

  @ValidateNested()
  address: Address;
}

const data = new RegistrationData();
data.name = 'Олена';
(data as any).address = { city: 123 };

const errors = validateSync(data, {
  validationError: { target: false, value: false },
});

console.log(JSON.stringify(errors, null, 2));
