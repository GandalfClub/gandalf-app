import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-create-draft-event-popover',
	templateUrl: './create-draft-event-popover.component.html',
	styleUrls: ['./create-draft-event-popover.component.scss']
})
export class CreateDraftEventPopoverComponent implements OnInit {
	public eventPopoverForm: FormGroup;

	@Output()
	public creating: EventEmitter<any> = new EventEmitter();

	constructor(
		private fb: FormBuilder,
		private dialog: MatDialog,
		public dialogRef: MatDialogRef <CreateDraftEventPopoverComponent>
	) { }

	public ngOnInit(): void {
		this.eventPopoverForm = this.fb.group({
			title: ['', [Validators.required]]
		});
	}

	public open(): void {
		this.dialog.open(CreateDraftEventPopoverComponent)
		.afterClosed().pipe(take(1)).subscribe((title: string) => this.creating.emit(title));
	}

	public submitEventPopover(): void {
		this.dialogRef.close(this.eventPopoverForm.value.title);
	}

}
