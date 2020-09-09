import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';

export interface UsersState {
	users: EntityWrapper<User[]>;
	user: EntityWrapper<User>;
}
