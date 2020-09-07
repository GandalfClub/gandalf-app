import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDemoRowComponent } from './component-demo-row.component';

describe('ComponentDemoComponent', () => {
	let component: ComponentDemoRowComponent;
	let fixture: ComponentFixture<ComponentDemoRowComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ComponentDemoRowComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ComponentDemoRowComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
