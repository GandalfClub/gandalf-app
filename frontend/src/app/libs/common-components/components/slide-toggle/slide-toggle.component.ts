import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter, Optional, Host, SkipSelf, ElementRef, forwardRef, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { FormControl, ControlContainer, FormGroup, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

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
export class SlideToggleComponent implements ControlValueAccessor, OnInit, AfterViewInit {

	@Input()
	public disabled: boolean = false;

	@Input()
	public title: string = '';

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public value: boolean;

	@Input() public formControlName: string;

	@Input() public formControl: FormControl;

	@Output() public valueChange: EventEmitter<boolean> = new EventEmitter();

	@Output() public toggled: EventEmitter<boolean> = new EventEmitter();

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

	public toggle(): void {
		this.value = !this.value;
		this.toggled.emit(this.value);
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
