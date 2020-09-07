import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonComponentsDemoComponent } from './common-components-demo.component';

describe('CommonComponentsDemoComponent', () => {
	let component: CommonComponentsDemoComponent;
	let fixture: ComponentFixture<CommonComponentsDemoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ CommonComponentsDemoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CommonComponentsDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
