import { Component, Input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TextareaComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends FormControlCommonDirective {
	@Input() public label: string;
	@Input() public widthTextarea: string;
	@Input() public formControlName: string;
	@Input() public formControl: FormControl;
	@Input() public value: number | string | boolean | null | undefined;
}
