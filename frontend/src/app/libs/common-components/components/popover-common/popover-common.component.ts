import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-popover-common',
  templateUrl: './popover-common.component.html',
	styleUrls: ['./popover-common.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class PopoverCommonComponent {

	@Input()
		public theme: ComponentTheme = ComponentTheme.Light;

  @ViewChild('template')
		public tpl: TemplateRef<any>;

  constructor(
		private dialog: MatDialog,
		public dialogRef: MatDialogRef <any>

	) { }

	public open(): void {
		if (this.isDarkTheme) {
			this.dialogRef = this.dialog.open(this.tpl, {
				minWidth: '480px',
				panelClass: 'gendalf-dialog-dark'
			});
		}	else {
			this.dialogRef = this.dialog.open(this.tpl, {
			minWidth: '480px',
	});
}
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public close(): void {
		this.dialogRef.close();
	}

}
