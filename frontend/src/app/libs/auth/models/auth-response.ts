import { UserDto } from './user-dto';

export interface AuthResponse {
	status: number;
	user: UserDto;
	logged: boolean;
	message: string;
	isCompetitionActive: boolean;
}
