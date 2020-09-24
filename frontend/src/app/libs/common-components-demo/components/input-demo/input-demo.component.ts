import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-input-demo',
	templateUrl: './input-demo.component.html',
	styleUrls: ['./input-demo.component.scss']
})
export class InputDemoComponent implements OnInit {

	private pattern: string = '^[A-Za-z0-9!@#$%^&*]{6,}$';

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
			text1: [''],
			text2: ['', Validators.required],
			text3: ['My text', Validators.required],
		});
		this.inputEmailDemoForm = this.fb.group({
			email1: ['', [Validators.required, Validators.email]],
			email2: ['email', [Validators.required, Validators.email]],
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

}
