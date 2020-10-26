import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenuModule } from '@angular/material/menu';

import { LocalizationComponent } from './localization.component';
import { LocalizationModule } from './localization.module';

describe('LocalizationComponent', () => {
	let component: LocalizationComponent;
	let fixture: ComponentFixture<LocalizationComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ MatMenuModule, LocalizationModule ]
		})
		.compileComponents();

		fixture = TestBed.createComponent(LocalizationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
