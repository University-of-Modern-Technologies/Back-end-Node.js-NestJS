import { IsNumber, IsString, Max, Min, validateSync } from 'class-validator';

class RegistrationData {
  @IsString()
  name: string;

  @IsNumber()
  @Min(18)
  @Max(120)
  age: number;
}

const data = new RegistrationData();
data.name = 'Олена';
data.age = 15;

const errors = validateSync(data, {
  validationError: { target: false, value: false },
});

console.log(JSON.stringify(errors, null, 2));
