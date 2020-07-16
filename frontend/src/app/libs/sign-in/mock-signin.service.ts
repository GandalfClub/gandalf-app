import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IUser, IRegisteredUser } from '../container/store';

const delay100: number = 100;

@Injectable({
	providedIn: 'root',
})
export class MockSigninService {
	private user: IRegisteredUser = {
		id: '111111',
		email: 'test@test.com',
		password: 'asdasd',
	};

	public signIn(user: IUser): Observable<IRegisteredUser> {
		const response: IRegisteredUser = this.user;
		return of(response).pipe(delay(delay100));
	}
}
