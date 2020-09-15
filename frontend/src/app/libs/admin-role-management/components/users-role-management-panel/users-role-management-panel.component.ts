import { Component, QueryList, ChangeDetectorRef, ViewChildren, AfterViewChecked, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable, Subject } from 'rxjs';
import { UserRoleTileComponent } from '../user-role-tile/user-role-tile.component';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaim } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-users-role-management-panel',
	templateUrl: './users-role-management-panel.component.html',
	styleUrls: ['./users-role-management-panel.component.scss'],
})
export class UsersRoleManagementPanelComponent implements OnInit, AfterViewChecked, OnDestroy {
	@ViewChildren(UserRoleTileComponent) public userTemplates: QueryList<UserRoleTileComponent>;
	public searchText: string = '';
	public userNotFound: boolean = false;
	public userTemplatesChanges$: Observable<SimpleChanges[]>;
	public destroy$: Subject<boolean> = new Subject();
	public userUpdate: EntityWrapper<User>;
	public users: User[];

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private usersFacadeService: UsersFacadeService,
		private aurhFacadeService: AuthFacadeService
	) {}

	public get userUpdateState(): boolean {
		return this.userUpdate.status === EntityStatus.Pending;
	}

	public ngOnInit(): void {
		this.usersFacadeService.users$.pipe(takeUntil(this.destroy$)).subscribe((users: EntityWrapper<User[]>) => {
			this.users = users.value;
		});

		this.aurhFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.userUpdate = user;
		});
	}

	public ngAfterViewChecked(): void {
		this.userTemplatesChanges$ = this.userTemplates.changes;
		this.changeDetectorRef.detectChanges();
	}

	public changeUserState(event: boolean, user: User): void {
		const currentClaims: UserClaim[] = [...user.claims];
		if (event) {
			currentClaims.push(UserClaim.EventManager);
			this.aurhFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: currentClaims }))(user));
		}
		if (!event) {
			const claimsWithoutEventManager: UserClaim[] = currentClaims.filter((item: string) => item !== UserClaim.EventManager);
			this.aurhFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: claimsWithoutEventManager }))(user));
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
