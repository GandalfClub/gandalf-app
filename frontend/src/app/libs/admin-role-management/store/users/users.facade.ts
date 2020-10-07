import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { selectUsers, selectUsersValue } from './users.selectors';
import { LoadUsers } from './users.actions';
import { UsersState } from './users-state';
import { User } from '../../../auth/models/user';

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

	public loadUsers(): void {
		this.store.dispatch(new LoadUsers());
	}
}
