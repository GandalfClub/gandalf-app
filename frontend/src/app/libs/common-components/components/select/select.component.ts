import { Component, Input, ChangeDetectionStrategy, forwardRef, Output, EventEmitter, OnInit, Optional, Host, SkipSelf, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, ControlContainer, FormGroup } from '@angular/forms';

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
export class SelectComponent implements OnInit {
	public icon: string = 'keyboard_arrow_down';
	public opened: boolean = false;
	@Input() public label: string;
	@Input() public formControlName: string;
	@Input() public formControl: FormControl;
	@Input() public value: number | string | null | undefined;
	@Output() public valueChange: EventEmitter<number | string | boolean | null | undefined> = new EventEmitter();

	public constructor(
		@Optional() @Host() @SkipSelf() protected parentFormContainer: ControlContainer,
		public elementRef: ElementRef
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

	private setValue(value: any): void {
		this.value = value;
		this.onChange(value);
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
}

