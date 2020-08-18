export function createSpy<T>(prototypeOrMethods: T | Array<keyof T>, params?: { [prop in keyof T]?: T[prop] }): jasmine.SpyObj<T> {
	const methodsSpy: jasmine.SpyObj<T> =
		prototypeOrMethods instanceof Array
			? createSpyObj(prototypeOrMethods)
			: createSpyObj(Object.getOwnPropertyNames(prototypeOrMethods).filter((propName: string) => propName !== 'constructor'));

	// tslint:disable-next-line:prefer-object-spread
	return Object.assign({}, methodsSpy, params);
}

// TODO fix typing
function createSpyObj<T>(propNames: any): jasmine.SpyObj<T> {
		// tslint:disable-next-line:prefer-object-spread
	return propNames.length > 0 ? jasmine.createSpyObj<T>(propNames) : <jasmine.SpyObj<T>>{};
}
