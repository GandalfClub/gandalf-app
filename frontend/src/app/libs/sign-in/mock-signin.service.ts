import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IUser, IIsLogged } from '../container/store';

const delay100: number = 100;

@Injectable({
	providedIn: 'root',
})
export class MockSigninService {
	private user: any = {
		_id: 'o21i3h421o3h4213uh4',
		email: 'test@mail.com',
	};

	public signIn(user: IUser): Observable<IIsLogged> {
		const response: IIsLogged = {
			user: this.user,
			isLogged: true,
		};
		return of(response).pipe(delay(delay100));
	}
}
