import { User } from '../../auth/models/user';
import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';
import { GeneralEventInfo } from '../../event-creation/store/model/model';
import { EventParticipation } from './event-participation.class';
import { EventUserRoles } from './event-user-roles.enum';

export interface Event {
	id: string;
	generalInfo: GeneralEventInfo;
	created: Date;
	color?: string;
	users: User[];
	size: EventCardSize;
	roles: EventUserRoles[];
	eventParticipations: EventParticipation[];
	tasks: string[];
}
