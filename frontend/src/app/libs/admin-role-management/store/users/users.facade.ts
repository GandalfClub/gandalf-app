import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { selectUsers, selectUsersValue, selectUser } from './users.selectors';
import { LoadUsers, UpdateUser } from './users.actions';
import { UsersState } from './users-state';
import { User } from 'src/app/libs/auth/models/user';

@Injectable({
	providedIn: 'root',
})
export class UsersFacadeService {
	constructor(private store: Store<UsersState>) {}

	public get users$(): Observable<EntityWrapper<User[]>> {
		return this.store.pipe(select(selectUsers));
	}

	public get usersValue$(): Observable<User[]> {
		return this.store.pipe(select(selectUsersValue));
	}

	public get usersState$(): Observable<EntityWrapper<User>> {
		return this.store.pipe(select(selectUser));
	}

	public loadUsers(): void {
		this.store.dispatch(new LoadUsers());
	}

	public updateUser(user: User): void {
		this.store.dispatch(new UpdateUser(user));
	}
}
