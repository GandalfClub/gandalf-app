import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsDemoGroupComponent } from './components-demo-group.component';

describe('ComponentsDemoGroupComponent', () => {
	let component: ComponentsDemoGroupComponent;
	let fixture: ComponentFixture<ComponentsDemoGroupComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ ComponentsDemoGroupComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(ComponentsDemoGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets isDark', () => {
		describe('as true', () => {
			beforeEach(() => {
				component.isDark = true;
				fixture.detectChanges();
			});

			it('should have dark modifier', () => {
				expect(htmlElement.querySelector('.components-demo-group--dark')).toBeTruthy();
			});
		});

		describe('as falsy', () => {
			beforeEach(() => {
				component.isDark = false;
				fixture.detectChanges();
			});

			it('should have not dark modifier', () => {
				expect(htmlElement.querySelector('.components-demo-group--dark')).toBeNull();
			});
		});
	});

	describe('when @Input does not get isDark', () => {
		it('should have not dark modifier', () => {
			expect(htmlElement.querySelector('.components-demo-group--dark')).toBeNull();
		});
	});

	describe('when @Input gets groupName', () => {
		const groupName: string = 'event-tile';

		beforeEach(() => {
			component.groupName = groupName;
			fixture.detectChanges();
		});

		it('should show groupName', () => {
			expect(htmlElement.querySelector('h1.components-demo-group__title').textContent).toContain(groupName);
		});
	});
});
