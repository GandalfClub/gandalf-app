import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventPooverComponent } from './libs/common-components/event-poover/event-poover.component';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public title: string = 'gandalf';
	constructor(public dialog: MatDialog) {}
	public openDialog(): void {
		this.dialog.open(EventPooverComponent);
	  }
}

