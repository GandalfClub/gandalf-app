import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, OnInit, ElementRef, Optional, Host, SkipSelf, forwardRef } from '@angular/core';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from './dateadapter';
import { ControlValueAccessor, FormControl, ControlContainer, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentTheme } from '../../shared/component-theme.enum';

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
export class DatepickerComponent implements ControlValueAccessor, OnInit {
	@Input() public formControlName: string;

	@Input() public label: string;

	@Input() public value: number | string | boolean | null | undefined;

	@Input() public formControl: FormControl;

	@Input() public theme: ComponentTheme = ComponentTheme.Light;

	@Output() public valueChange: EventEmitter<number | string | boolean | null | undefined> = new EventEmitter();

	public constructor(
		@Optional() @Host() @SkipSelf() protected parentFormContainer: ControlContainer,
		public elementRef: ElementRef,
	) { }

	public ngOnInit(): void {
		this.formControlName = this.elementRef.nativeElement.getAttribute('formControlName');
		if (this.formControlName != null && this.parentFormContainer != null) {
			this.formControl = (this.parentFormContainer.control as FormGroup).controls[this.formControlName] as FormControl;
			if (this.formControl === undefined) {
				throw new Error(`Form control ${this.formControlName} is not registered in form group`);
			}
		} else {
			this.formControl = new FormControl('');
		}
	}

	public onTouched: any = () => undefined;
	public onChange: any = () => undefined;

	public writeValue(value: any): void {
		if (!Boolean(this.value)) {
			this.value = value;
		}
		this.onChange(value);
		if (this.formControl && this.formControl.value) {
			this.onTouched();
		}
		this.valueChange.emit(value);
	}

	public onValueChange(value: any): void {
		this.onTouched();
		if (Boolean(this.value) && this.value !== value) {
			this.setValue(value);
			this.valueChange.emit(value);
		}
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	private setValue(value: any): void {
		this.value = value;
		this.onChange(value);
	}

}
