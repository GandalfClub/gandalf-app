import { User } from '../../auth/models/user';
import { EventCardSize } from '../../common-components/components/event-card/models/event-card-size';

export interface Event {
	id: string;
	title: string;
	description: string;
	created: Date;
	startDate: Date;
	startTime: Date;
	endDate: Date;
	endTime: Date;
	users: User[];
	size: EventCardSize;
}
