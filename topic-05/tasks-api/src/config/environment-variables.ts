import { IsEnum, IsNumber, Max, Min, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum NodeEnvironment {
  Development = 'development',
  Production = 'production',
}

export class EnvironmentVariables {
  @IsNumber()
  @Min(1)
  @Max(65535)
  PORT: number;

  @IsEnum(NodeEnvironment)
  NODE_ENV: NodeEnvironment;

  @IsNumber()
  @Min(1)
  @Max(500)
  TASKS_MAX_PAGE_SIZE: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
