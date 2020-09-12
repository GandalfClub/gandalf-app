import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserClaims } from '../../models/user-claims.enum';
import { User } from 'src/app/libs/auth/models/user';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
	selector: 'app-user-role-tile',
	templateUrl: './user-role-tile.component.html',
	styleUrls: ['./user-role-tile.component.scss'],
})
export class UserRoleTileComponent {
	@Output() public isEventManager: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() public user: User;

	@Input() public userUpdateIsDisabled: boolean = false;

	public get userEventManagerState(): boolean {
		return this.user.claims.includes(UserClaims.EventManager);
	}

	public toggleIsAdminClaim(event: MatSlideToggleChange): void {
		this.isEventManager.emit(event.checked);
	}
}
