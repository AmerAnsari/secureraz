import { User } from './user';

/**
 * Authentication response
 */
export interface AuthResponse {
  token: string;
  user: User;
}
