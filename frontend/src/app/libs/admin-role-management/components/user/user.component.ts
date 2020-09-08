import { Component, Output, EventEmitter, Input } from '@angular/core';
import { User } from '../../models/user';
import { UserClaims } from '../../models/user-claims.enum';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent {
	@Output() public userIdTochangeEventManagerStatus: EventEmitter<string> = new EventEmitter<string>();

	@Input() public user: User;

	public get getUserEventManagerState(): boolean {
		return this.user.claims.includes(UserClaims.eventManager);
	}

	public setUserEventManagerState(): void {
		this.userIdTochangeEventManagerStatus.emit(this.user.id);
	}
}
