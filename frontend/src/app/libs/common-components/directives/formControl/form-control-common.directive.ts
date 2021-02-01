import { Input, Output, EventEmitter, Optional, Host, SkipSelf, ElementRef, OnInit, AfterViewInit, Directive } from '@angular/core';
import { FormControl, ControlContainer, FormGroup } from '@angular/forms';

@Directive(
	{selector: '[appFormControlCommon]'}
)
export class FormControlCommonDirective implements OnInit, AfterViewInit {

	@Input()
	public value: boolean | number | string | null | undefined;

	@Input() public formControlName: string;

	@Input() public formControl: FormControl;

	@Output() public valueChange: EventEmitter<any> = new EventEmitter();

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

	public registerOnChange(fn: any): void { this.onChange = fn; }

	public registerOnTouched(fn: any): void { this.onTouched = fn; }

	private setValue(value: any): void {
		this.value = value;
		this.onChange(value);
	}
}
