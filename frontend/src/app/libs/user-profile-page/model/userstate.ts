import { IUser } from './user';
import { Wrapper } from './wraper';

export interface UserState {
	userData: Wrapper<IUser>;
}
