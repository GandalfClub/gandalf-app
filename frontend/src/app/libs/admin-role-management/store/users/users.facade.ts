import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { selectUsers, selectUsersStatus, selectUsersValue } from './users.selectors';
import { LoadUsers, RemoveUser, ToggleEventManagerRole } from './users.actions';
import { UsersState } from './users-state';
import { User } from '../../../auth/models/user';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

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

	public get usersStatus$(): Observable<EntityStatus> {
		return this.store.pipe(select(selectUsersStatus));
	}

	public loadUsers(): void {
		this.store.dispatch(new LoadUsers());
	}

	public toggleEventManagerClaim(user: User): void {
		this.store.dispatch(new ToggleEventManagerRole(user));
	}

	public removeUser(user: User): void {
		this.store.dispatch(new RemoveUser(user));
	}
}
