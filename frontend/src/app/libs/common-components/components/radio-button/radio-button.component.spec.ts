import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentTheme } from '../../shared/component-theme.enum';

import { RadioButtonComponent } from './radio-button.component';

describe('RadioButtonComponent', () => {
	let component: RadioButtonComponent;
	let fixture: ComponentFixture<RadioButtonComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ RadioButtonComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(RadioButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets theme', () => {
		describe('when theme is Light', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should show default Light radio-button', () => {
				expect(htmlElement.querySelector('.radio-button').className).toBe('radio-button');
			});
		});

		describe('when theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark radio button', () => {
				expect(htmlElement.querySelector('.radio-button').className).toBe('radio-button radio-button--dark-theme');
			});
		});
	});

	describe('when @Input gets value', () => {
		const value: number = 1;

		beforeEach(() => {
			component.value = value;
			fixture.detectChanges();
		});

		it('should define value', () => {
			expect(component.value).toBe(value);
		});
	});

	describe('when @Input gets disabled', () => {
		describe('when disabled is true', () => {
			beforeEach(() => {
				component.disabled = true;
				fixture.detectChanges();
			});

			it('should show disabled radio-button', () => {
				expect(htmlElement.querySelector('.radio-button__label--disabled')).toBeTruthy();
			});
		});

		describe('when disabled is false', () => {
			beforeEach(() => {
				component.disabled = false;
				fixture.detectChanges();
			});

			it('should not show disabled radio-button', () => {
				expect(htmlElement.querySelector('.radio-button__label--disabled')).toBeFalsy();
			});
		});
	});

	describe('when @Input gets name', () => {
		const name: string = 'name';

		beforeEach(() => {
			component.name = name;
			fixture.detectChanges();
		});

		it('should define name of radio buttons', () => {
			expect(component.name).toBe(name);
		});
	});
});
