export interface IUser {
	email: string;
	password: string;
}
export interface IIsLogged {
	user: IUser;
	isLogged: boolean;
}
