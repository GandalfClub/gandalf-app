export interface NewEvent {
	title: string;
	shortSummary: string;
	startDate: Date;
	endDate: Date;
	startTime: Date;
	endTime: Date;
	description: string;
	isPrivate: boolean;
	isContinuous: boolean;
	isDraft: boolean;
	isActive: boolean;
}
