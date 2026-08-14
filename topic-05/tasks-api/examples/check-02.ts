import { IsEnum, validateSync } from 'class-validator';

enum Role {
  Student = 'student',
  Teacher = 'teacher',
}

class RegistrationData {
  @IsEnum(Role)
  role!: Role;
}

const data = new RegistrationData();

data.role = 'admin' as Role;

const errors = validateSync(data, {
  validationError: { target: false, value: false },
});

console.log(JSON.stringify(errors, null, 2));
