import { User } from './user';

export interface AuthResponse {
	status: number;
	user: User;
	logged: boolean;
	message: string;
	isCompetitionActive: boolean;
}