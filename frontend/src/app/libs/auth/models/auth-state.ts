import { EntityWrapper } from './entity-wraper';
import { User } from './user';

export interface AuthState {
	user: EntityWrapper<User>;
}
