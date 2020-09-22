import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsPanelComponent } from './tabs-panel.component';

describe('TabsPanelComponent', () => {
	let component: TabsPanelComponent;
	let fixture: ComponentFixture<TabsPanelComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TabsPanelComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TabsPanelComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
