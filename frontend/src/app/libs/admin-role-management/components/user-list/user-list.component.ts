import { Component, QueryList, ChangeDetectorRef, ViewChildren, AfterViewChecked, SimpleChanges } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable } from 'rxjs';
import { UserComponent } from '../user/user.component';
import { User } from 'src/app/libs/auth/models/user';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements AfterViewChecked {
	@ViewChildren(UserComponent) public userTemplates: QueryList<UserComponent>;
	public searchText: string = '';
	public userNotFound: boolean = false;
	public userTemplatesChanges$: Observable<SimpleChanges[]>;
	public id: string;

	constructor(private changeDetectorRef: ChangeDetectorRef, private usersFacadeService: UsersFacadeService) {}

	public get users$(): Observable<User[]> {
		return this.usersFacadeService.usersValue$;
	}

	public ngAfterViewChecked(): void {
		this.userTemplatesChanges$ = this.userTemplates.changes;
		this.changeDetectorRef.detectChanges();
	}

	public changeUserState(user: User): void {
		this.usersFacadeService.updateUser(user);
	}
}
