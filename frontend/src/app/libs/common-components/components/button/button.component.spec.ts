import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { ButtonType } from '../../models/button-type.enum';
import { ComponentTheme } from '../../shared/component-theme.enum';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ ButtonComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets type', () => {
		describe('type is basic', () => {
			beforeEach(() => {
				component.type = ButtonType.Basic;
				fixture.detectChanges();
			});

			it('should show basic button', () => {
				expect(htmlElement.querySelector('.button.button--basic')).toBeTruthy();
			});
		});

		describe('type is outlined', () => {
			beforeEach(() => {
				component.type = ButtonType.Outlined;
				fixture.detectChanges();
			});

			it('should show outlined button', () => {
				expect(htmlElement.querySelector('.button.button--outlined')).toBeTruthy();
			});
		});

		describe('type is flat', () => {
			beforeEach(() => {
				component.type = ButtonType.Flat;
				fixture.detectChanges();
			});

			it('should show flat button', () => {
				expect(htmlElement.querySelector('.button.button--flat')).toBeTruthy();
			});
		});
	});

	describe('when @Input gets theme', () => {
		describe('theme is Dark', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Dark;
				fixture.detectChanges();
			});

			it('should show dark themed button', () => {
				expect(htmlElement.querySelector('.button.button--dark-theme')).toBeTruthy();
			});
		});
		describe('theme is Light', () => {
			beforeEach(() => {
				component.theme = ComponentTheme.Light;
				fixture.detectChanges();
			});

			it('should show light themed button', () => {
				expect(htmlElement.querySelector('.button.button--dark-theme')).toBeNull();
			});
		});
	});

	describe('when @Input gets disabled', () => {
		describe('disabled truthy', () => {
			beforeEach(() => {
				component.disabled = true;
				fixture.detectChanges();
			});

			it('should show disabled button', () => {
				expect(htmlElement.querySelector('.button[disabled]')).toBeTruthy();
			});
		});

		describe('disabled falsy', () => {
			beforeEach(() => {
				component.disabled = false;
				fixture.detectChanges();
			});

			it('should show enabled button', () => {
				expect(htmlElement.querySelector('.button[disabled]')).toBeNull();
			});
		});
	});

	describe('when @Input does not get type', () => {
		it('should show basic button', () => {
			expect(htmlElement.querySelector('.button.button--basic')).toBeTruthy();
		});
	});

	describe('when @Input does not get theme', () => {
		it('should show light themed button', () => {
			expect(htmlElement.querySelector('.button.button--dark-theme')).toBeNull();
		});
	});

	describe('when @Input does not get disabled', () => {
		it('should show enabled button', () => {
			expect(htmlElement.querySelector('.button[disabled="true"]')).toBeNull();
		});
	});
});
