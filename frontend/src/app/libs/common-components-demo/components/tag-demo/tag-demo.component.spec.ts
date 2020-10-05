import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDemoComponent } from './tag-demo.component';

describe('TagDemoComponent', () => {
	let component: TagDemoComponent;
	let fixture: ComponentFixture<TagDemoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ TagDemoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TagDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
