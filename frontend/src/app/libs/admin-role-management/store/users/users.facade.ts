import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from '../../models/user';
import { selectUsers, selectUsersValue } from './users.selectors';
import { LoadUsers } from './users.actions';
import { UsersState } from './users-state';

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
