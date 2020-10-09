import { Component, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaim } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { takeUntil } from 'rxjs/operators';
import { UserSearchService } from '../../services/user-search.service';

@Component({
	selector: 'app-users-role-management-panel',
	templateUrl: './users-role-management-panel.component.html',
	styleUrls: ['./users-role-management-panel.component.scss'],
})
export class UsersRoleManagementPanelComponent implements OnInit, OnDestroy {
	public searchText: string = '';
	public userTemplatesChanges$: Observable<SimpleChanges[]>;
	public destroy$: Subject<boolean> = new Subject();
	public userUpdate: EntityWrapper<User>;
	public users: User[];

	constructor(
		private userSearchService: UserSearchService,
		private usersFacadeService: UsersFacadeService,
		private authFacadeService: AuthFacadeService
	) {}

	public get updateInProgress(): boolean {
		return this.userUpdate.status === EntityStatus.Pending;
	}

	public get foundUsers(): User[] {
		return this.userSearchService.userSearch(this.users, this.searchText);
	}

	public get foundUsersEmpty(): boolean {
		return this.foundUsers && this.foundUsers.length === 0;
	}

	public ngOnInit(): void {
		this.usersFacadeService.users$.pipe(takeUntil(this.destroy$)).forEach((users: EntityWrapper<User[]>) => {
			this.users = users.value;
		});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.userUpdate = user;
		});
	}

	public toggleEventManagerClaim(isEventManager: boolean, user: User): void {
		const toggledUser: User = isEventManager ?
						{...user, claims: [...user.claims, UserClaim.EventManager]} :
						{...user, claims: user.claims.
							filter((claim: UserClaim) => claim !== UserClaim.EventManager)};
		this.usersFacadeService.toggleEventManagerClaim(user);
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
