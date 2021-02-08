import { Component, Input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends FormControlCommonDirective {
	public icon: string = 'keyboard_arrow_down';
	public opened: boolean = false;
	@Input() public label: string;
	@Input() public formControlName: string;
	@Input() public formControl: FormControl;
	@Input() public value: number | string | null | undefined;

	public openedChange(opened: boolean): void {
		this.opened = opened;
		this.icon = opened ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
	}

	public generateTime(): string[] {
		const maxhour: number = 23;
		const zero: number = 0;
		const one: number = 1;
		const tenhours: number = 10;
		const arrayTime: string[] = [];

		for (let i: number = zero; i <= maxhour; i++) {
			let hour: number | string = i;
			if (i < tenhours) {
				hour = '0' + hour;
			}
			for (let j: number = zero; j <= one; j++) {
				const min: string = j === 1 ? '30' : '00';
				arrayTime.push(`${hour}:${min}`);
			}
		}
		return arrayTime;
	}

}
