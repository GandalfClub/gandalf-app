import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
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
export class InputComponent implements ControlValueAccessor {

	private pattern: string = '^[A-Za-z0-9!@#$%^&*]{6,}$';



	@Input()
	public value: string = '';

	// @Input()
	// public formControlName: string;

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

	// @Input()
	// public set defaultValue(value: string) {
	// 	this.formControlName.setValue(value);
	// }

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public formControl: FormControl = new FormControl('', [
		this.isRequired ? Validators.required : null,
		this.inputType === InputType.Email ? Validators.email : Validators.nullValidator,
		this.inputType === InputType.Password ? Validators.pattern(this.pattern) : Validators.nullValidator
		  ]);


	public onTouched: any = () => {};

	private onChange: any = (value: any) => {};



	// public emailFormControl: FormControl = new FormControl('', [
	// 	this.isRequired ? Validators.required : null,
	// 	Validators.email,
	// ]);

	// public passwordFormControl: FormControl = new FormControl('', [
	// 	this.isRequired ? Validators.required : null,
	// 	Validators.pattern('^[A-Za-z0-9!@#$%^&*]{6,}$')
  	// ]);

	public get isText(): boolean {
		return this.inputType === InputType.Text ? true : false;
	}

	public get isEmail(): boolean {
		return this.inputType === InputType.Email ? true : false;
	}

	public get isPassword(): boolean {
		return this.inputType === InputType.Password ? true : false;
	}

	// public get formControlName1(): FormControl {
	// 	if (this.inputType === InputType.Text) {
	// 		return this.textFormControl;
	// 	}	else if (this.inputType === InputType.Email) {
	// 		return this.emailFormControl;
	// 	} else if (this.inputType === InputType.Password) {
	// 		return this.passwordFormControl;
	// 	}
	// }

	public get type(): string {
		if (this.inputType !== 'password') {
			return this.inputType;
		} else if (this.inputType === 'password' && this.hide) {
			return 'password';
		} else if (this.inputType === 'password' && !this.hide) {
			return 'text';
		}
	}
	constructor(private renderer: Renderer2, private element: ElementRef){}

	public writeValue(value: string): void {
		console.log(value);
		if (!Boolean(value) || typeof(value) !== 'string') {
			return;
		}
		this.value = value;
		// this.renderer.setProperty(this.element.nativeElement, 'value', value);
	  }


	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	

}
