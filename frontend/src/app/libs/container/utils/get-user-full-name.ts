export function getUserFullName(firstName: string, secondName: string): string {
	return (typeof firstName === 'string' && typeof secondName === 'string') && (firstName.replace(/\s/g, '').length > 0 || secondName.replace(/\s/g, '').length > 0) ?
	`${firstName} ${secondName}` :
	'';
}
