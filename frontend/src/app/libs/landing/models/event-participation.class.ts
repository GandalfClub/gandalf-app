import { EventUserRoles } from './event-user-roles.enum';

export class EventParticipation {
	constructor(
		public userId: string,
		public eventId: string,
		public roles: EventUserRoles[] = [EventUserRoles.Participator],
		public approved: boolean = false,
	) { }
}
