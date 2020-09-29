import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-input-demo',
	templateUrl: './input-demo.component.html',
	styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent implements OnInit {

	private pattern: string = '^[A-Za-z0-9!@#$%^&*]{6,}$';

	public 	inputSyncValidators: ValidatorFn[] = [this.userNameValidator];
	public 	inputAsyncValidators: AsyncValidatorFn[] = [this.testAsyncValidator];

	public inputTextDemoForm: FormGroup;
	public inputEmailDemoForm: FormGroup;
	public inputPasswordDemoForm: FormGroup;

	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	constructor(
		private fb: FormBuilder
	) { }

	public ngOnInit(): void {
		this.inputTextDemoForm = this.fb.group({
			text1: ['', Validators.required],
			text2: ['', Validators.required],
			text3: ['Disabled', Validators.required],
		});
		this.inputEmailDemoForm = this.fb.group({
			email1: ['',  [Validators.required, Validators.email]],
			email2: ['', [Validators.required, Validators.email]],
			email3: ['email@gmail.com', [Validators.required, Validators.email]],
		});
		this.inputPasswordDemoForm = this.fb.group({
			password1: ['', [Validators.required, Validators.pattern(this.pattern)]],
			password2: ['123', [Validators.required, Validators.pattern(this.pattern)]],
			password3: ['123456', [Validators.required, Validators.pattern(this.pattern)]],
		});

	}
	public submit(): void {
		console.log(this.inputTextDemoForm);
		console.log(this.inputEmailDemoForm);
		console.log(this.inputPasswordDemoForm);
	}

	public userNameValidator(control: FormControl): ValidationErrors | null {
		const minLength: number = 6;
		if (control.value.length < minLength) {
			return {valueLength: 'It should be at least 6 characters'};
		}
		return null;
	}

	public async testAsyncValidator(control: FormControl): Promise<ValidationErrors> {
		return Promise.resolve({asyncError: 'its permanent testing async error'});
	}
}
