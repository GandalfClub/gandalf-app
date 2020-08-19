export interface Wrapper<T> {
	status: boolean;
	value?: T;
	error?: any;
}
