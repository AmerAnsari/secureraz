import { User } from 'src/app/shared/interfaces/user';

/**
 * Authentication response
 */
export interface AuthResponse {
  token: string;
  user: User;
}
