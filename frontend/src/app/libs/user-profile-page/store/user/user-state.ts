import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';

export interface UserState {
	userData: EntityWrapper<User>;
}
