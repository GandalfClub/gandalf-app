import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, forwardRef } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlCommonDirective } from '../../directives/formControl/form-control-common.directive';

@Component({
	selector: 'app-slide-toggle',
	templateUrl: './slide-toggle.component.html',
	styleUrls: ['./slide-toggle.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SlideToggleComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideToggleComponent extends FormControlCommonDirective {

	@Input()
	public disabled: boolean = false;

	@Input()
	public title: string = '';

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public value: boolean;

	@Input()
  public labelPosition: 'before' | 'after';

	@Input() public formControlName: string;

	@Input() public formControl: FormControl;

	@Output() public toggled: EventEmitter<boolean> = new EventEmitter();

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public toggle(): void {
		this.value = !this.value;
		this.toggled.emit(this.value);
	}

}
