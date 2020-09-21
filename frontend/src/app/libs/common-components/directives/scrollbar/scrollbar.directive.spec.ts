import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { ScrollbarDirective } from './scrollbar.directive';

@Component({
	template: `
	<div appScrollbar></div>
	<div appScrollbar [theme]="lightTheme"></div>
	<div appScrollbar [theme]="darkTheme"></div>`
})
class ScrollbarDirectiveTestComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
}

describe('ScrollbarDirective', () => {
	let component: ScrollbarDirectiveTestComponent;
	let fixture: ComponentFixture<ScrollbarDirectiveTestComponent>;
	let elementsWithDirective: HTMLElement[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ ScrollbarDirective, ScrollbarDirectiveTestComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(ScrollbarDirectiveTestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		elementsWithDirective = fixture.nativeElement.children;
	});

	it('should init directive', () => {
		const expectedQuantity: number = 3;
		expect(elementsWithDirective.length).toBe(expectedQuantity);
	});

	describe('when @Input does not get theme', () => {
		it('should show light theme', () => {
			expect(
				elementsWithDirective[0].classList.contains('scrollbar') &&
				elementsWithDirective[0].classList.contains('scrollbar--light-theme'))
			.toBeTrue();
		});
	});

	describe('when @Input gets theme', () => {
		describe('when theme is Light', () => {
			it('should show light theme', () => {
				expect(
					elementsWithDirective[1].classList.contains('scrollbar') &&
					elementsWithDirective[1].classList.contains('scrollbar--light-theme'))
				.toBeTrue();
			});
		});

		describe('when theme is Dark', () => {
			it('should show dark theme', () => {
				expect(
					elementsWithDirective[2].classList.contains('scrollbar') &&
					elementsWithDirective[2].classList.contains('scrollbar--dark-theme'))
				.toBeTrue();
			});
		});
	});
});
