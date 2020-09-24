import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';

import { TabsPanelComponent } from './tabs-panel.component';

describe('TabsPanelComponent', () => {
	let component: TabsPanelComponent;
	let fixture: ComponentFixture<TabsPanelComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [ TabsPanelComponent ],
			imports: [ MatTabsModule ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(TabsPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when @Input gets label', () => {
		const label: string = 'TAB';

		beforeEach(() => {
			component.label = label;
			fixture.detectChanges();
		});

		it('should define label', () => {
			expect(component.label).toBe(label);
		});
	});
});
