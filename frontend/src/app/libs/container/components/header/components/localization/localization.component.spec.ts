import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { LocalizationComponent } from './localization.component';

describe('LocalizationComponent', () => {
	let component: LocalizationComponent;
	let fixture: ComponentFixture<LocalizationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ MatMenuModule ],
			declarations: [ LocalizationComponent ]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(LocalizationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
