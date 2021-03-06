import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserClaim } from '../../admin-role-management/models/user-claims.enum';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { DefaultAvatarUrl } from '../models/default-avatar-url';
import { getUserFullName } from '../utils/get-user-full-name';
import { ContainerFacadeService } from './container-facade.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public user: User;

	private unsubscribe$: Subject<boolean> = new Subject<boolean>();

	constructor(private containerFacadeService: ContainerFacadeService) {}

	public get userFullName(): string {
		return getUserFullName(this.user?.firstName, this.user?.secondName);
	}

	public get userEmail(): string {
		return this.user?.email;
	}

	public get isUnauthorizedUser(): boolean {
		return !Boolean(this.user);
	}

	public get isAdminUser(): boolean {
		return this.user?.claims?.includes(UserClaim.Admin);
	}

	public get isEventManagerUser(): boolean {
		return this.user?.claims?.includes(UserClaim.EventManager);
	}

	public get photoUrl(): string {
		return Boolean(this.user?.photoUrl) ? this.user?.photoUrl :
			this.isAdminUser ? DefaultAvatarUrl.Admin :
			this.isEventManagerUser ? DefaultAvatarUrl.EventManager :
			DefaultAvatarUrl.Participation;
	}

	public subscribeUser(): void {
		this.containerFacadeService.user$
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe((entity: EntityWrapper<User>) => {
			this.user = entity.value;
		});
	}

	public unsubscribeUser(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
