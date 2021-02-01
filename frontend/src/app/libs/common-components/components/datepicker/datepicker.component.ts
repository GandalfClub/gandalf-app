import { Component, Input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './dateadapter';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';

@Component({
	selector: 'app-datepicker',
	templateUrl: './datepicker.component.html',
	styleUrls: ['./datepicker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DatepickerComponent),
			multi: true
		},
		{ provide: DateAdapter, useClass: AppDateAdapter },
		{ provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent extends FormControlCommonDirective {
	@Input() public formControlName: string;

	@Input() public label: string;

	@Input() public value: number | string | boolean | null | undefined;

	@Input() public formControl: FormControl;

}
