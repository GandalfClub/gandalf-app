import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';
import { EventParticipation } from './event-participation.class';
import { EventUserRoles } from './event-user-roles.enum';

export interface EventDto {
	_id: string;
	isActive: boolean;
	maxScore: number;
	tasks: any[];
	users: any;
	participations: any;
	title: string;
	description: string;
	created: Date;
	startDate: Date;
	startTime: Date;
	endDate: Date;
	endTime: Date;
	size: EventCardSize;
	eventParticipations: EventParticipation[];
	roles: EventUserRoles[];
}
