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
}
