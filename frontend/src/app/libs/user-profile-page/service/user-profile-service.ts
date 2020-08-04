import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ImprovedUser } from '../models/improved_user';

const delay100: number = 100;

@Injectable({
	providedIn: 'root',
})
export class UserProfileService {
	private userArray: ImprovedUser[] = [
		{
			email: 'test@test.com',
			password: 'asdasd',
			phone: '',
			firstName: '',
			lastName: '',
		},
		{
			email: 'ldo1@tut.by',
			password: 'asdasd',
			phone: '+375291469782',
			firstName: 'Dzmitri',
			lastName: 'Lituyev',
		},
	];

	private findUser(mail: string): ImprovedUser {
		let user: ImprovedUser = this.userArray.find((item: ImprovedUser) => item.email === mail);
		if (user === undefined) {
			user = { email: mail, password: '', phone: '', firstName: '', lastName: '' };
		}
		return user;
	}

	public getUser(login: string): Observable<ImprovedUser> {
		const response: ImprovedUser = this.findUser(login);
		return of(response).pipe(delay(delay100));
	}

	public setUser(user: ImprovedUser): Observable<Boolean> {
		this.userArray.push(user);
		return of(true).pipe(delay(delay100));
	}
}
