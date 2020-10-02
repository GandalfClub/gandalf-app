import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGroupComponent } from './demo-group.component';

describe('ComponentsDemoGroupComponent', () => {
	let component: DemoGroupComponent;
	let fixture: ComponentFixture<DemoGroupComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ DemoGroupComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(DemoGroupComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets title', () => {
		const title: string = 'event-tile';

		beforeEach(() => {
			component.title = title;
			fixture.detectChanges();
		});

		it('should show title', () => {
			expect(htmlElement.querySelector('h3.demo-group__title').textContent).toContain(title);
		});
	});
});
