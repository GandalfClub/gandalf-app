import { User } from '../../auth/models/user';
import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';
import { EventParticipation } from './event-participation.class';
import { EventUserRoles } from './event-user-roles.enum';

export interface Event {
	id: string;
	title: string;
	description: string;
	created: Date;
	startDate: Date;
	startTime: Date;
	endDate: Date;
	endTime: Date;
	color?: string;
	users: User[];
	size: EventCardSize;
	roles: EventUserRoles[];
	eventParticipations: EventParticipation[];
}
