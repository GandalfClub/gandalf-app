import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetUserFromAuthAction, UpdateUserAction } from './user.actions';
import { Observable } from 'rxjs';
import { selectUser } from './user.selectors';
import { IUser } from '../../model/user';
import { UserState } from './user-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

@Injectable({
	providedIn: 'root',
})
export class UserFacadeService {
	constructor(private store: Store<UserState>) {}

	public updateUser(user: IUser): void {
		this.store.dispatch(new UpdateUserAction({ user }));
	}

	public getUserFromAuth(): void {
		this.store.dispatch(new GetUserFromAuthAction());
	}

	get user$(): Observable<EntityWrapper<IUser>> {
		return this.store.pipe(select(selectUser));
	}
}
