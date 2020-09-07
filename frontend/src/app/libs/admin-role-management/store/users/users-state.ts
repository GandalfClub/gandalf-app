import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../models/user';

export interface UsersState {
	users: EntityWrapper<User[]>;
}
