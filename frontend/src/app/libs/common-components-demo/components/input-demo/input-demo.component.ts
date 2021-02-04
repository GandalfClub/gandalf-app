import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-input-demo',
	templateUrl: './input-demo.component.html',
	styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent implements OnInit {

	public textSyncValidators: ValidatorFn[] = [this.requiredValidator];
	public textAsyncValidators: AsyncValidatorFn[] = [this.testAsyncValidator];

	public emailValidators: ValidatorFn[] = [this.emailValidator, this.requiredValidator, this.lengthValidator];
	public passwordValidators: ValidatorFn[] = [this.requiredValidator, this.lengthValidator];

	public inputTextDemoForm: FormGroup;
	public inputEmailDemoForm: FormGroup;
	public inputPasswordDemoForm: FormGroup;

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	@Output() public buttonClick: EventEmitter <any> = new EventEmitter();

	constructor(
		private fb: FormBuilder,
	) { }

	public ngOnInit(): void {
		this.inputTextDemoForm = this.fb.group({
			text1: [''],
			text2: [''],
			text3: ['Disabled'],
			text4: [''],
			text5: [''],
			text6: ['Disabled'],
		});
		this.inputEmailDemoForm = this.fb.group({
			email1: [''],
			email2: [''],
			email3: ['email@gmail.com'],
			email4: [''],
			email5: [''],
			email6: ['email@gmail.com'],
		});
		this.inputPasswordDemoForm = this.fb.group({
			password1: [''],
			password2: ['123'],
			password3: ['123456'],
			password4: [''],
			password5: ['123'],
			password6: ['123456'],
		});
	}

	public submit(status: string): void {
		if (status === 'VALID') {
		this.buttonClick.emit('value');
		}
	}

	public lengthValidator(control: AbstractControl): ValidationErrors | null {
		const minLength: number = 6;
		if (control && Boolean(control.value) && control.value.length < minLength) {
			return {message: 'It should be at least 6 characters'};
		}
		return null;
	}

	public emailValidator(control: AbstractControl): ValidationErrors | null {
		console.log('works');
		const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (control && Boolean(control.value) && !emailPattern.test(control.value)) {
			return {message: `Wrong email address`};
		}
		return null;
	}

	public requiredValidator(control: AbstractControl): ValidationErrors | null {
		if (!Boolean(control.value)) {
			return {message: `Its required field`};
		}
		return null;
	}

	public async testAsyncValidator(control: AbstractControl): Promise<ValidationErrors> {
		return await Promise.resolve({message: 'Its a permanent testing async error'});
	}
}
