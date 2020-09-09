import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { UserClaims } from '../../models/user-claims.enum';
import { User } from 'src/app/libs/auth/models/user';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
	@Output() public userIdTochangeEventManagerStatus: EventEmitter<User> = new EventEmitter<User>();

	@Input() public user: User;

	public userEventManagerState: boolean = false;

	public setValue(event: any): void {
		if (event.checked) {
			const users: User = {
				...this.user,
				claims: [UserClaims.eventManager],
			};
			this.userIdTochangeEventManagerStatus.emit(users);
			this.userEventManagerState = true;
		}
		if (!event.checked) {
			const users: User = {
				...this.user,
				claims: [],
			};
			this.userIdTochangeEventManagerStatus.emit(users);
			this.userEventManagerState = false;
		}
	}

	public ngOnInit(): void {
		this.userEventManagerState = this.user.claims.length > 0 && this.user.claims[0].includes(UserClaims.eventManager);
	}
}
