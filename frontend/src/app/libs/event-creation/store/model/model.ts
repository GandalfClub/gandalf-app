export interface GeneralEventInfo {
	title: string;
	shortSummary?: string;
	startDate: Date;
	endDate: Date;
	startTime: string;
	endTime: string;
	description: string;
	isPrivate: boolean;
	isContinuous: boolean;
	isDraft: boolean;
}
