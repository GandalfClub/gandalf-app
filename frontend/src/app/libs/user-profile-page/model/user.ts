export interface IUser {
	id: string;
	email: string;
	firstName: string;
	secondName: string;
	mobilePhone: string;
	isAdmin: boolean;
	password: string;
	displayName?: string;
	photoUrl?: string;
}
