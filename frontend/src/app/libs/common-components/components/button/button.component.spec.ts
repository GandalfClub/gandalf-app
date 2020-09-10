import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

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
				component.type = 'basic';
				fixture.detectChanges();
			});

			it('should show basic button', () => {
				expect(htmlElement.querySelector('.button.button--basic')).toBeTruthy();
			});
		});

		describe('type is outlined', () => {
			beforeEach(() => {
				component.type = 'outlined';
				fixture.detectChanges();
			});

			it('should show basic button', () => {
				expect(htmlElement.querySelector('.button.button--outlined')).toBeTruthy();
			});
		});

		describe('type is flat', () => {
			beforeEach(() => {
				component.type = 'flat';
				fixture.detectChanges();
			});

			it('should show basic button', () => {
				expect(htmlElement.querySelector('.button.button--flat')).toBeTruthy();
			});
		});
	});
});
