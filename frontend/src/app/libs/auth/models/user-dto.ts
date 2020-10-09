import { UserClaim } from './user-claim';

export interface UserDto {
	_id: string;
	email: string;
	isAdmin: boolean;
	displayName?: string;
	photoUrl?: string;
	firstName?: string;
	secondName?: string;
	mobilePhone?: string;
	password?: string;
	claims?: UserClaim[];
}
