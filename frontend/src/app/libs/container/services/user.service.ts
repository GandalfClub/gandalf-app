import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { UserClaim } from '../../auth/models/user-claim';
import { DefaultAvatarUrl } from '../models/default-avatar-url';
import { getUserFullName } from '../utils/get-user-full-name';
import { ContainerFacadeService } from './container.facade';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

	private user: User;

	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(private containerFacadeService: ContainerFacadeService) {
		this.containerFacadeService.user$
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe((entity: EntityWrapper<User>) => {
			this.user = entity.value;
		});
	}

	public get userFullName(): string {
		return getUserFullName(this.user.firstName, this.user.secondName);
	}

	public get userEmail(): string {
		return this.user?.email;
	}

	public get isUnauthorizedUser(): boolean {
		return this.user === undefined;
	}

	public get isAdminUser(): boolean {
		return this.user ? this.user.claims?.includes(UserClaim.Admin) : false;
	}

	public get isEventManagerUser(): boolean {
		return this.user ? this.user.claims?.includes(UserClaim.EventManager) : false;
	}

	public get photoUrl(): string {
		return Boolean(this.user?.photoUrl) ? this.user?.photoUrl :
			this.isAdminUser ? DefaultAvatarUrl.Admin :
			this.isEventManagerUser ? DefaultAvatarUrl.EventManager :
			DefaultAvatarUrl.Participation;
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
