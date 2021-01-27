import { Component, Input, ChangeDetectionStrategy, forwardRef, Optional, Host, SkipSelf, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlContainer, FormControl, ControlValueAccessor, FormGroup } from '@angular/forms';
import { ComponentTheme } from '../../shared/component-theme.enum';

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
export class TextareaComponent implements ControlValueAccessor, OnInit, AfterViewInit {
	@Input() public label: string;
	@Input() public widthTextarea: string;
	@Input() public formControlName: string;
	@Input() public formControl: FormControl;
	@Input() public value: number | string | boolean | null | undefined;
	@Input() public secured: boolean = true;
	@Output() public valueChange: EventEmitter<boolean> = new EventEmitter();
	@Output() public toggled: EventEmitter<boolean> = new EventEmitter();
	theme: any;

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

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public writeValue(val: boolean | null): void {
		this.value = val;
	}

	public onValueChange(value: any): void {
		this.onTouched();
		if (Boolean(this.value) && this.value !== value) {
			this.setValue(value);
			this.valueChange.emit(value);
		}

	}

	public ngAfterViewInit(): void {
		setTimeout(() => {
			if (Boolean(this.value)) {
				this.formControl.setValue(this.value);
			}
		}, 0);
	}

	public onTouched: any = () => this.value;

	public onChange: any = () => this.value;

	registerOnChange(fn: any): void { this.onChange = fn; }

	registerOnTouched(fn: any): void { this.onTouched = fn; }

	private setValue(value: any): void {
		this.value = value;
		this.onChange(value);
	}

}
