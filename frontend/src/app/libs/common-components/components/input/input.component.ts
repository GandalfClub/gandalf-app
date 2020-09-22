import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { InputType } from '../../shared/input-type.enum';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {

	@Input()
	public hide: boolean = true;

	@Input()
	public inputType: string;

	@Input()
	public label: string = 'label';

	@Input()
	public placeholder: string = 'placeholder';

	@Input()
	public isRequired: boolean = true;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public set defaultValue(value: string) {
		this.formControlName.setValue(value);
	}

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public textFormControl: FormControl = new FormControl('', [
		this.isRequired ? Validators.required : null,
  	]);

	public emailFormControl: FormControl = new FormControl('', [
		this.isRequired ? Validators.required : null,
		Validators.email,
	]);

	public passwordFormControl: FormControl = new FormControl('', [
		this.isRequired ? Validators.required : null,
		Validators.pattern('^[A-Za-z0-9!@#$%^&*]{6,}$')
  	]);

	public get isText(): boolean {
		return this.inputType === InputType.Text ? true : false;
	}

	public get isEmail(): boolean {
		return this.inputType === InputType.Email ? true : false;
	}

	public get isPassword(): boolean {
		return this.inputType === InputType.Password ? true : false;
	}

	public get formControlName(): FormControl {
		if (this.inputType === InputType.Text) {
			return this.textFormControl;
		}	else if (this.inputType === InputType.Email) {
			return this.emailFormControl;
		} else if (this.inputType === InputType.Password) {
			return this.passwordFormControl;
		}
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

}
