import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoStateComponent } from './demo-state.component';

describe('ComponentDemoComponent', () => {
	let component: DemoStateComponent;
	let fixture: ComponentFixture<DemoStateComponent>;
	let htmlElement: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ DemoStateComponent ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(DemoStateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		htmlElement = fixture.nativeElement;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets name', () => {
		const name: string = 'Contest';

		beforeEach(() => {
			component.title = name;
			fixture.detectChanges();
		});

		it('should show demo component name', () => {
			expect(htmlElement.querySelector('.demo-state__title').outerHTML).toContain(name);
		});
	});
});
