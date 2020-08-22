import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {GetUserFromAuthAction, UpdateUserAction} from './user.actions';
import { Observable } from 'rxjs';
import { selectUser } from './user.selectors';
import { IUser } from '../../model/user';
import { UserState } from '../../model/userstate';
import { Wrapper } from '../../model/wraper';

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

	get user$(): Observable<Wrapper<IUser>> {
		return this.store.pipe(select(selectUser));
	}
}
