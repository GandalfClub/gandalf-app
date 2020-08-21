export interface Event {
	_id: string;
	title: string;
	description: string;
	isActive: boolean;
	created: Date;
	startDate: Date;
	endDate: Date;
	maxScore: number;
	tasks: string[];
	users: string[];
	participations: string[];
}
