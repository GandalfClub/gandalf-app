export interface User {
	id: string;
	email: string;
	photoUrl?: string;
	firstName?: string;
	secondName?: string;
	claims: string[];
	isAdmin: boolean;
	displayName?: string;
	mobilePhone?: string;
	password?: string;
}
