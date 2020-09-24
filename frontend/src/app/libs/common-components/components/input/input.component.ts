import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { InputType } from '../../shared/input-type.enum';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputComponent),
			multi: true
		}
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor, OnInit {

	@Input()
	public formControl: FormControl;

	@Input()
	public value: string = '';

	@Input()
	public hide: boolean = true;

	@Input()
	public inputType: InputType = InputType.Text;

	@Input()
	public label: string = 'label';

	@Input()
	public placeholder: string = 'placeholder';

	@Input()
	public isRequired: boolean = true;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public inputFormGroup: FormGroup = new FormGroup({
	formControl : new FormControl ('')
		});

	public get isText(): boolean {
		return this.inputType === InputType.Text ? true : false;
	}

	public get isEmail(): boolean {
		return this.inputType === InputType.Email ? true : false;
	}

	public get isPassword(): boolean {
		return this.inputType === InputType.Password ? true : false;
	}

	public get type(): string {
		if (this.inputType !== 'password') {
			return this.inputType;
		} else if (this.inputType === 'password' && this.hide) {
			return 'password';
		} else if (this.inputType === 'password' && !this.hide) {
			return 'text';
		}
	}

	public ngOnInit(): void {
		if (this.formControl) {
			this.inputFormGroup.controls['formControl'] = this.formControl;
		}
	}

	public onTouched: any = () => {console.log('onTouched'); };

	public onChange: any = (value: any) => {console.log('onChange'); };

	public writeValue(value: string): void {
		this.value = value;
		this.onChange(value);
		if (this.formControl && this.formControl.value) {
			this.onTouched();
		}
	  }

	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

}
