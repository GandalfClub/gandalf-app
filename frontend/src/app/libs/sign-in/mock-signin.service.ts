import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

const delay100: number = 100;

@Injectable({
	providedIn: 'root',
})
export class MockSigninService {
	private user: any = {
		_id: 'o21i3h421o3h4213uh4',
		email: 'test@mail.com',
	};

	constructor() {}

	public signIn(email: string, password: string): Observable<{ user: any; logged: boolean }> {
		const response: { user: any; logged: boolean } = {
			user: this.user,
			logged: true,
		};
		return of(response).pipe(delay(delay100));
	}
}
