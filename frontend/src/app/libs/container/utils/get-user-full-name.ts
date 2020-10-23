export function getUserFullName(firstName: string, secondName: string): string {
	const isFirstNameExists: boolean = typeof firstName === 'string';
	const isSecondNameExists: boolean = typeof secondName === 'string';
	const isNamesNotEmpty: boolean = (firstName?.replace(/\s/g, '').length > 0 || secondName?.replace(/\s/g, '').length > 0);
	return isFirstNameExists && isSecondNameExists && isNamesNotEmpty ? `${firstName} ${secondName}` : '';
}
