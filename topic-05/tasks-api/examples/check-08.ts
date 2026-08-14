import { IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class RegistrationData {
  @IsString()
  name: string;
}

const raw = { name: 'Олена', role: 'admin' };

const withoutForbid = plainToInstance(RegistrationData, raw);
const errorsWithoutForbid = validateSync(withoutForbid, { whitelist: true });
console.log('whitelist: true →', withoutForbid);
console.log(JSON.stringify(errorsWithoutForbid));

const withForbid = plainToInstance(RegistrationData, raw);
const errorsWithForbid = validateSync(withForbid, {
  whitelist: true,
  forbidNonWhitelisted: true,
});

console.log('whitelist + forbidNonWhitelisted →', withForbid);
console.log(
  JSON.stringify(
    errorsWithForbid.map((e) => ({
      property: e.property,
      constraints: e.constraints,
    })),
  ),
);
