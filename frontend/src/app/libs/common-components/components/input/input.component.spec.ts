import { forwardRef } from '@angular/core';
import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;
	let html: HTMLElement;

	const label: string = 'test label';
	const placeholder: string = 'test placeholder';
	const value: string = 'test';
	const errorText: string = 'It should be at least 6 characters';
	const prefix: string = '+375';
	const mask: string = '(00)-000-00-00';

	const lengthValidator: ValidatorFn = function userNameValidator(control: FormControl): ValidationErrors | null {
		const minLength: number = 6;
		if (control.value.length < minLength) {
			return {message: errorText};
		}
		return null;
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ InputComponent ],
			imports: [ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule, BrowserAnimationsModule,
				NgxMaskModule.forRoot() ],
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
		// component.prefix = prefix;
		// component.mask = mask;
		component.inputValidators = [lengthValidator];

		fixture.detectChanges();
	});

	// it('should create', () => {
	// 	expect(component).toBeTruthy();
	// });

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

			it('should generate error in formControl', fakeAsync(() => {
				component.validate();
				flush();

				expect(component.formControl.errors).toBeTruthy();
			}));

			it('should not render errors if unmarked', fakeAsync(() => {
				component.validate();
				flush();

				expect(html.innerText.includes(errorText)).toBeFalsy();
			}));

			it('should set errors text to errorsArray', fakeAsync(() => {
				component.validate();
				flush();

				expect(component.errorsArray.includes(errorText)).toBeTruthy();
			}));

			it('should render error message', fakeAsync(() => {
				component.validate();
				component.formControl.markAsTouched();
				flush();
				fixture.detectChanges();

				expect(html.innerText.includes(errorText)).toBeTruthy();
			}));
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
