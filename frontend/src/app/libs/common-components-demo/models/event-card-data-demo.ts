import { EventCardRole } from '../../common-components/components/event-card/models/event-card-role';

export interface EventCardDataDemo {
	title: string;
	startDate: Date;
	endDate: Date;
	roles: EventCardRole[];
}
