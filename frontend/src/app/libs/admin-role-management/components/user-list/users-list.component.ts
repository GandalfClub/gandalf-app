import { Component, QueryList, ChangeDetectorRef, ViewChildren, AfterViewChecked, SimpleChanges } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { User } from 'src/app/libs/auth/models/user';
import { UserClaims } from '../../models/user-claims.enum';

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

	public ngAfterViewChecked(): void {
		this.userTemplatesChanges$ = this.userTemplates.changes;
		this.changeDetectorRef.detectChanges();
	}

	public changeUserState(event: boolean, user: User): void {
		console.log(user);
		const claim: string[] = [];
		claim.push(UserClaims.eventManager);
		const users: any = (({ claims, password, ...dto }: User) => ({ ...dto }))(user);
		users.claims = claim;
		console.log(users);
		this.usersFacadeService.updateUser(users);
		// if (event) {
		// 	delete user.claims;
		// 	claims.push(UserClaims.eventManager);
		// }
		// if (!event) {
		// 	const claim: string[] = [...user.claims];
		// 	const claims: string[] = claim.filter((item: string) => item !== UserClaims.eventManager);
		// 	console.log(claims);
		// 	this.usersFacadeService.updateUser({ ...user, claims });
		// }
	}
}
