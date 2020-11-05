import { Component, SimpleChanges, OnDestroy, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaim } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { take, takeUntil } from 'rxjs/operators';
import { UserSearchService } from '../../services/user-search.service';
import { ColumnConfig, TableColumnType } from 'src/app/libs/common-components/components/table/models/row-config.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { RowToggleOutput } from 'src/app/libs/common-components/components/table/models/row-toggle-output.enum';
import { UrlResolver } from '@angular/compiler';

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

	// public data: User[];

	public pendingStatus: string = EntityStatus.Pending;

	public headerButtonText: string = 'delete';

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public usersRequestStatus: string;
	// public requestStatus$: Observable<string> = this.usersFacadeService.usersStatus$;

	public columnsConfig: ColumnConfig[] = [
		{
			columnType: TableColumnType.Checkbox,
			columnName: 'check',
			dataName: 'check'
		},
		{
			columnType: TableColumnType.TextSortable,
			columnName: 'Name',
			dataName: 'firstName'
		},
		{
			columnType: TableColumnType.Text,
			columnName: 'Email',
			dataName: 'email'
		},
		{
			columnType: TableColumnType.Toggle,
			columnName: 'Event Manager',
			dataName: 'isEventManager'
		}
	];

	private checkedUsers: User[];

	constructor(
		private userSearchService: UserSearchService,
		private usersFacadeService: UsersFacadeService,
		private authFacadeService: AuthFacadeService,
	) {}

	public ngOnInit(): void {

		this.usersFacadeService.users$.pipe(takeUntil(this.destroy$)).forEach((users: EntityWrapper<User[]>) => {

		this.usersRequestStatus = users.status;

		const temporaryUsers: User[] = [];

		if (Boolean(users.value?.length) && this.usersRequestStatus !== EntityStatus.Pending) {
			for (const user of users.value) {
				const userForTable: User = {...user};
				userForTable.isEventManager =
					userForTable.claims.includes(UserClaim.EventManager) ?
					true :
					false;
					temporaryUsers.push(userForTable);
			}
			this.users = temporaryUsers;
			console.log('data', temporaryUsers)

		}

		});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.userUpdate = user;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	public get updateInProgress(): boolean {
		return this.userUpdate.status === EntityStatus.Pending;
	}

	public get foundUsers(): User[] {
		return this.userSearchService.userSearch(this.users, this.searchText);
	}

	public get foundUsersEmpty(): boolean {
		return this.foundUsers && this.foundUsers.length === 0;
	}

	public toggleEventManagerClaim(event: RowToggleOutput<User>): void {
		const user: User = event.row;
		const toggledUser: User = event.state ?
						{...user, claims: [...user.claims.
							filter((claim: UserClaim) => claim !== UserClaim.EventManager), UserClaim.EventManager]} :
						{...user, claims: user.claims.
							filter((claim: UserClaim) => claim !== UserClaim.EventManager)};
		this.usersFacadeService.toggleEventManagerClaim(toggledUser);
	}

	public onCheck(selected: User[]): void {
		this.checkedUsers = [...selected];
	}

	public onHeaderButtonClick(selected: User[]): void {
		console.log(selected);
	}

	public onRowButtonClick(user: User): void {
		this.usersFacadeService.removeUser(user);

		console.log(user);
	}
}
