import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';
import { GeneralEventInfo } from '../../event-creation/store/model/model';
import { EventParticipation } from './event-participation.class';
import { EventUserRoles } from './event-user-roles.enum';

export interface EventDto {
	_id: string;
	generalInfo: GeneralEventInfo;
	isActive: boolean;
	maxScore: number;
	tasks: any[];
	users: any;
	participations: any;
	created: Date;
	size: EventCardSize;
	eventParticipations: EventParticipation[];
	roles: EventUserRoles[];
}
