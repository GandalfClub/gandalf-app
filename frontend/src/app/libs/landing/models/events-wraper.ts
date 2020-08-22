export interface EntityWraper<T> {
	loadingEvents: boolean;
	value?: T;
	error?: Error;
}
