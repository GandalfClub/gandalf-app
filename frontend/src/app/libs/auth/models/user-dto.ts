import { UserClaim } from '../../admin-role-management/models/user-claims.enum';

export interface UserDto {
	_id: string;
	email: string;
	isAdmin: boolean;
	isEventManager?: boolean;
	displayName?: string;
	photoUrl?: string;
	firstName?: string;
	secondName?: string;
	mobilePhone?: string;
	password?: string;
	claims: UserClaim[];
	checked?: boolean;
}
