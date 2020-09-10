import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserClaims } from '../../models/user-claims.enum';
import { User } from 'src/app/libs/auth/models/user';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent {
	@Output() public isUserEventManager: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() public user: User;

	@Input() public userUpdateStatus: string;

	@Input() public userUpdateCurrentState: string;

	public get userUpdateState(): boolean {
		return this.userUpdateCurrentState === EntityStatus.Pending;
	}

	public get userEventManagerState(): boolean {
		return this.user.claims.includes(UserClaims.eventManager);
	}

	public setValue(event: any): void {
		this.isUserEventManager.emit(event.checked);
	}
}
