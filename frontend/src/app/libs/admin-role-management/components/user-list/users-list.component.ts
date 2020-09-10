import { Component, QueryList, ChangeDetectorRef, ViewChildren, AfterViewChecked, SimpleChanges } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaims } from '../../models/user-claims.enum';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

@Component({
	selector: 'app-users-list',
	templateUrl: './users-list.component.html',
	styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements AfterViewChecked {
	@ViewChildren(UserComponent) public userTemplates: QueryList<UserComponent>;
	public searchText: string = '';
	public userNotFound: boolean = false;
	public userTemplatesChanges$: Observable<SimpleChanges[]>;

	constructor(private changeDetectorRef: ChangeDetectorRef, private usersFacadeService: UsersFacadeService) {}

	public get users$(): Observable<User[]> {
		return this.usersFacadeService.usersValue$;
	}

	public get userState$(): Observable<EntityWrapper<User>> {
		return this.usersFacadeService.usersState$;
	}

	public ngAfterViewChecked(): void {
		this.userTemplatesChanges$ = this.userTemplates.changes;
		this.changeDetectorRef.detectChanges();
	}

	public changeUserState(event: boolean, user: User): void {
		const currentClaims: string[] = [...user.claims];
		if (event) {
			currentClaims.push(UserClaims.eventManager);
			this.usersFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: currentClaims }))(user));
		}
		if (!event) {
			const claimsWithoutEventManager: string[] = currentClaims.filter((item: string) => item !== UserClaims.eventManager);
			this.usersFacadeService.updateUser((({ claims, password, ...dto }: User) => ({ ...dto, claims: claimsWithoutEventManager }))(user));
		}
	}
}
