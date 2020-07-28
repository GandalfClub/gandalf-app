import { User } from './user';

export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	errorMessage: string | null;
}
