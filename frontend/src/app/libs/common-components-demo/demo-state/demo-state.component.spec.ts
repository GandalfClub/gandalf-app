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

	describe('when @Input gets title', () => {
		const title: string = 'Contest';

		beforeEach(() => {
			component.title = title;
			fixture.detectChanges();
		});

		it('should show title', () => {
			expect(htmlElement.querySelector('.demo-state__title').outerHTML).toContain(title);
		});
	});

	describe('when @Input gets isDark', () => {
		beforeEach(() => {
			component.isDark = true;
			fixture.detectChanges();
		});

		it('should show dark-theme title', () => {
			expect(htmlElement.querySelector('.demo-state__title--dark-theme')).toBeTruthy();
		});
	});
});
