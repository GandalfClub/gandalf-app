import { Component, Output, EventEmitter, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { User } from '../../models/user';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnChanges {
	@Output() public changeEventManagerStatus: EventEmitter<boolean> = new EventEmitter<boolean>();

	@Input() public isEventManager: boolean = false;

	@Input() public user: User;

	public ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);
	}
}
