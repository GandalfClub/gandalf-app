import { Component, QueryList, ChangeDetectorRef, ViewChildren, AfterViewChecked, SimpleChanges } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable } from 'rxjs';
import { UserRoleTileComponent } from '../user-role-tile/user-role-tile.component';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaims } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Component({
	selector: 'app-users-role-management-panel',
	templateUrl: './users-role-management-panel.component.html',
	styleUrls: ['./users-role-management-panel.component.scss'],
})
export class UsersRoleManagementPanelComponent implements AfterViewChecked {
	@ViewChildren(UserRoleTileComponent) public userTemplates: QueryList<UserRoleTileComponent>;
	public searchText: string = '';
	public userNotFound: boolean = false;
	public userTemplatesChanges$: Observable<SimpleChanges[]>;
	public userUpdateCurrentState: string;

	constructor(
		private changeDetectorRef: ChangeDetectorRef,
		private usersFacadeService: UsersFacadeService,
		private aurhFacadeService: AuthFacadeService
	) {}

	public get users$(): Observable<User[]> {
		return this.usersFacadeService.usersValue$;
	}

	public get user$(): Observable<EntityWrapper<User>> {
		return this.aurhFacadeService.user$;
	}

	public userUpdateState(userUpdateCurrentState: string): boolean {
		return userUpdateCurrentState === EntityStatus.Pending;
	}

	public ngAfterViewChecked(): void {
		this.userTemplatesChanges$ = this.userTemplates.changes;
		this.changeDetectorRef.detectChanges();
	}

	public changeUserState(event: boolean, user: User): void {
		const currentClaims: string[] = [...user.claims];
		if (event) {
			currentClaims.push(UserClaims.EventManager);
			this.aurhFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: currentClaims }))(user));
		}
		if (!event) {
			const claimsWithoutEventManager: string[] = currentClaims.filter((item: string) => item !== UserClaims.EventManager);
			this.aurhFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: claimsWithoutEventManager }))(user));
		}
	}
}
