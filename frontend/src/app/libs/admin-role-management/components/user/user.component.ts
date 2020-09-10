import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserClaims } from '../../models/user-claims.enum';
import { User } from 'src/app/libs/auth/models/user';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent {
	@Output() public userIdTochangeEventManagerStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() public user: User;

	@Input() public userUpdateStatus: string;

	public get userEventManagerState(): boolean {
		return this.user.claims && this.user.claims.includes(UserClaims.eventManager);
	}

	public setValue(event: any): void {
		this.userIdTochangeEventManagerStatus.emit(event.checked);
	}
}
