import 'reflect-metadata';
import {
  IsArray,
  IsString,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { Type, plainToInstance } from 'class-transformer';

class Address {
  @IsString()
  city: string;
}

class RegistrationData {
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ValidateNested({ each: true })
  @Type(() => Address)
  addresses: Address[];
}

const raw = {
  tags: ['a', 5, 'c'],
  addresses: [{ city: 'Полтава' }, { city: 42 }],
};

const data = plainToInstance(RegistrationData, raw);
const errors = validateSync(data, {
  validationError: { target: false, value: false },
});

console.log(JSON.stringify(errors, null, 2));
