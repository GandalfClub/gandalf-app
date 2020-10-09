import { Component, Output, EventEmitter, Input } from '@angular/core';
import { UserClaim } from '../../models/user-claims.enum';
import { User } from 'src/app/libs/auth/models/user';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
	selector: 'app-user-role-tile',
	templateUrl: './user-role-tile.component.html',
	styleUrls: ['./user-role-tile.component.scss'],
})
export class UserRoleTileComponent {
	@Output() public eventManagerClaimToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() public user: User;

	@Input() public disabled: boolean = false;

	public get userEventManagerState(): boolean {
		return this.user.claims.includes(UserClaim.EventManager);
	}

	public toggleEventManagerClaim(event: boolean): void {
		this.eventManagerClaimToggled.emit(event);
	}
}
