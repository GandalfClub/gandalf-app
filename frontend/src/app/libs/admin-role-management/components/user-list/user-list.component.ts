import {
	Component,
	QueryList,
	ChangeDetectorRef,
	ViewChildren,
	AfterViewChecked,
	SimpleChanges,
	OnDestroy,
	SimpleChange,
} from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable, Subject } from 'rxjs';
import { User } from '../../models/user';
import { UserComponent } from '../user/user.component';
import { takeUntil } from 'rxjs/operators';

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
}
