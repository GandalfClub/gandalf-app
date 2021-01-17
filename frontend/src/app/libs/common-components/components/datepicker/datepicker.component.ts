import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './dateadapter';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	providers: [
		{ provide: DateAdapter, useClass: AppDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {
	@Input() public label: string;
}
