import { forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;
	let html: HTMLElement;

	const label: string = 'test label';
	const placeholder: string = 'test placeholder';
	const value: string = 'test';
	const errorText: string = 'It should be at least 6 characters';

	const lengthValidator: ValidatorFn = function userNameValidator(control: FormControl): ValidationErrors | null {
		const minLength: number = 6;
		if (control.value.length < minLength) {
			return {valueLength: errorText};
		}
		return null;
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputComponent ],
			imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule, BrowserAnimationsModule ],
			providers: [
				{
				  provide: NG_VALUE_ACCESSOR,
				  multi: true,
				  useExisting: forwardRef(() => InputComponent),
				}
			  ]

		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		html = fixture.debugElement.nativeElement;
		component.label = label;
		component.placeholder = placeholder;
		component.inputValidators = [lengthValidator];

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('appearance', () => {
		it('label input should be rendered',  () => {
			expect (html.innerText.includes(label)).toBeTruthy();
			});

		it('placeholder input should be rendered',  () => {
			expect (html.innerHTML.includes(placeholder)).toBeTruthy();

			});
	});

	describe('validation', () => {
			beforeEach(() => {
				component.formControl.setValue(value);
				fixture.detectChanges();
			});

			it('should generate errors in formControl', () => {
				expect(component.formControl.errors.valueLength).toBe(errorText);
			});

			it('should not render errors if unmarked', () => {
				expect(html.innerText.includes(errorText)).toBeFalsy();
			});
			it('should set errors text to errorsArray', async () => {
				fixture.detectChanges();
				await new Promise((resolve: any) => {
					setTimeout(() => {
						resolve();
						}, 0);
				});
				expect(component.errorsArray.includes(errorText)).toBeTruthy();
			});
			it('should render error message', async () => {
				component.formControl.markAsTouched();
				await new Promise((resolve: any) => {
					setTimeout(() => {
						fixture.detectChanges();
						resolve();
						}, 0);
				});
				expect(html.innerText.includes(errorText)).toBeTruthy();
			});
		});

		describe('default value', () => {
			beforeEach(() => {
				component.value = value;
				fixture.detectChanges();
			});

			it('should render value from Input', () => {
				expect(html.innerText.includes(value)).toBeTruthy();
			});
		});

});
