import { IUser } from '../../model/user';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export interface UserState {
	userData: EntityWrapper<IUser>;
}
