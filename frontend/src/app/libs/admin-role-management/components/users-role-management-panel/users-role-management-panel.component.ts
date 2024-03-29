import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Subject } from 'rxjs';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaim } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { takeUntil } from 'rxjs/operators';
import { ColumnConfig, TableColumnType } from 'src/app/libs/common-components/components/table/models/row-config.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { RowToggleOutput } from 'src/app/libs/common-components/components/table/models/row-toggle-output.enum';
import { TableComponent } from 'src/app/libs/common-components/components/table/table.component';
import { ProgressBarMode } from 'src/app/libs/common-components/shared/progress-bar-mode.enum';

@Component({
	selector: 'app-users-role-management-panel',
	templateUrl: './users-role-management-panel.component.html',
	styleUrls: ['./users-role-management-panel.component.scss'],
})
export class UsersRoleManagementPanelComponent implements OnInit, OnDestroy {

	public destroy$: Subject<boolean> = new Subject();

	public userUpdate: EntityWrapper<User>;

	public users: User[];

	public isSelectedUsersRemoving: boolean;

	public pendingStatus: string = EntityStatus.Pending;

	public headerButtonText: string = 'delete';

	public progressBarMode: string = ProgressBarMode.Indeterminate;

	public readonly componentTheme: typeof ComponentTheme = ComponentTheme;

	public usersRequestStatus: string;

	public selectedUsers: User[];

	@ViewChild(TableComponent)
	public tableComponent: TableComponent <User>;

	public columnsConfig: ColumnConfig[] = [
		{
			columnType: TableColumnType.Checkbox,
			columnName: 'check',
			dataName: 'checked'
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

	constructor(
		private usersFacadeService: UsersFacadeService,
		private authFacadeService: AuthFacadeService
	) {}

	public ngOnInit(): void {

		this.usersFacadeService.users$
			.pipe(takeUntil(this.destroy$))
			.forEach((users: EntityWrapper<User[]>) => {

				this.usersRequestStatus = users.status;

				if (Boolean(users.value?.length) && this.usersRequestStatus !== EntityStatus.Pending) {

					this.users = this.getUsersForRender(users.value);

					if (Boolean(this.tableComponent) && this.isSelectedUsersRemoving) {
						this.isSelectedUsersRemoving = false;
						this.selectedUsers = [];
						this.tableComponent.clearSelectedRows();
					}
				}
			});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.userUpdate = user;
		});
	}

	public getUsersForRender(users: User[]): User[] {

		const temporaryUsers: User[] = [];

		for (const user of users) {
			let userForTable: User = {...user};

			if (Boolean(this.selectedUsers?.length)) {
				userForTable = this.getOriginalSelectedUserObjects(userForTable);
			}

			userForTable.isEventManager =
				userForTable.claims.includes(UserClaim.EventManager) ?
				true :
				false;

			temporaryUsers.push(userForTable);
		}

		return temporaryUsers;
	}

	public getOriginalSelectedUserObjects(user: User): User {
		this.selectedUsers.forEach((selectedUser: User) => {
			if (user.id === selectedUser.id) {
				user = selectedUser;
			}
		});
		return user;
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}

	public get updateInProgress(): boolean {
		return this.userUpdate.status === EntityStatus.Pending;
	}

	public toggleEventManagerClaim(event: RowToggleOutput<User>): void {
		const user: User = event.row;
		const toggledUser: User = event.state ?
						{...user, claims: [...this.filterByEventManagerClaim(user.claims), UserClaim.EventManager]} :
						{...user, claims: this.filterByEventManagerClaim(user.claims)};
		this.usersFacadeService.toggleEventManagerClaim(toggledUser);
	}

	public filterByEventManagerClaim(claims: UserClaim[]): UserClaim[] {
		return claims.filter((claim: UserClaim) => claim !== UserClaim.EventManager);
	}

	public onCheck(selected: User[]): void {
		this.selectedUsers = [...selected];
	}

	public onHeaderButtonClick(selectedUsers: User[]): void {
		const selectedUsersId: string[] = [];

		if (Boolean(selectedUsers.length)) {
			selectedUsers.map((user: User) => selectedUsersId.push(user.id));
		}

		this.isSelectedUsersRemoving = true;
		this.usersFacadeService.removeSelectedUsers(selectedUsersId);
	}

	public onRowButtonClick(user: User): void {
		this.usersFacadeService.removeUser(user);
	}
}
