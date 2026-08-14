import { UserRole } from '../../users/user-role.enum';

export interface JwtPayload {
  sub: string;
  role: UserRole;
  iat: number;
  exp: number;
}
