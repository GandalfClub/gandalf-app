import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-input-demo',
	templateUrl: './input-demo.component.html',
	styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent implements OnInit {

	public inputSyncValidators: ValidatorFn[] = [this.lengthValidator];
	public inputAsyncValidators: AsyncValidatorFn[] = [this.testAsyncValidator];

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
			text1: ['', this.requiredValidator],
			text2: ['', this.requiredValidator],
			text3: ['Disabled', this.requiredValidator],
		});
		this.inputEmailDemoForm = this.fb.group({
			email1: ['', [this.emailValidator, this.requiredValidator]],
			email2: ['', [this.emailValidator, this.requiredValidator, this.lengthValidator]],
			email3: ['email@gmail.com', [this.emailValidator, this.requiredValidator]],
		});
		this.inputPasswordDemoForm = this.fb.group({
			password1: ['', [this.requiredValidator, this.lengthValidator]],
			password2: ['123', [this.requiredValidator, this.lengthValidator]],
			password3: ['123456', [this.requiredValidator, this.lengthValidator]],
		});
	}
	
	public submit(status: string): void {
		if (status === 'VALID') {
		this.buttonClick.emit('value');
		}
	}

	public lengthValidator(control: FormControl): ValidationErrors | null {
		const minLength: number = 6;
		if (control && Boolean(control.value) && control.value.length < minLength) {
			return {valueLength: 'It should be at least 6 characters'};
		}
		return null;
	}

	public emailValidator(control: FormControl): ValidationErrors | null {
		const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (control && Boolean(control.value) && !emailPattern.test(control.value)) {
			return {email: `its wrong email address`};
		}
		return null;
	}

	public requiredValidator(control: FormControl): ValidationErrors | null {
		if (!Boolean(control.value)) {
			return {required: `its required`};
		}
		return null;
	}

	public async testAsyncValidator(control: FormControl): Promise<ValidationErrors> {
		return Promise.resolve({asyncError: 'its permanent testing async error'});
	}
}
